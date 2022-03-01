(ns compose
  (:require [clj-yaml.core :as yaml]
            [babashka.fs :as fs]
            [clojure.string :as str]
            [utils]))

(def pg-port 5432)
(def pg-data "./pgdata:/data")
(def ab-port 8080)
(def ab-host "devbox")
(def ab-url (str ab-host ":" ab-port))
(def ab-metrics-port 8089)
(def prom-port 9090)

(def grafana-ds
  {:apiVersion 1
   :datasources
   [{:name "aidbox-logs"
     :type "elasticsearch"
     :access "proxy"
     :database "*"
     :url "http://es:9200"
     :jsonData {:interval "Daily"
                :timeField "ts"
                :esVersion "7.0.0"
                :logMessageField "message"
                :logLevelField "fields.level"}}
    {:name "Prometheus"
     :type "prometheus"
     :access "proxy"
     :database "*"
     :url "http://prometheus:9090"}]})

(def prom-scrappers
  {:global {:scrape_interval "15s"
            :evaluation_interval "15s"
            :external_labels {:monitor "aidbox"}}
   :scrape_configs [{:job_name "prometheus"
                     :scrape_interval "5s"
                     :static_configs [{:targets ["localhost:9090"]}]}
                    {:job_name "pushgateway"
                     :scrape_interval "5s"
                     :honor_labels true
                     :static_configs [{:targets ["pushgateway:9091"]}]}
                    {:job_name "aidbox"
                     :scrape_interval "5s"
                     :metrics_path "/metrics"
                     :static_configs [{:targets [ab-url]}]}
                    {:job_name "aidbox-minutes"
                     :scrape_interval "30s"
                     :metrics_path "/metrics/minutes"
                     :static_configs [{:targets [ab-url]}]}
                    {:job_name "aidbox-hours"
                     :scrape_interval "1m"
                     :metrics_path "/metrics/hours"
                     :static_configs [{:targets [ab-url]}]}]})

(defn add-grafana [compose cfg]
  (-> compose
      (assoc-in [:volumes :grafana-data] nil)
      (assoc-in [:services :grafana]
                {:environment {:V "v5"}
                 :volumes ["grafana-data:/var/lib/grafana"
                           "./audit/grafana/provisioning:/etc/grafana/provisioning"]
                 :image "grafana/grafana:8.3.0"
                 :ports ["3000:3000"]
                 :user "104"})))

(defn add-prom [compose cfg]
  (let [prom (:monitoring cfg)]
    (fs/create-dirs "gen/prometheus")
    (spit "gen/prometheus/prometheus.yaml" (yaml/generate-string prom-scrappers))

    (-> compose
        (assoc-in [:services :devbox :environment :BOX_METRICS_PORT] ab-metrics-port)
        (assoc-in [:volumes :prometheus-data] nil)
        (assoc-in [:services :prometheus]
               {:image (or (:image prom) "prom/prometheus:v2.30.3")
                :environment {:V "v5"}
                :ports [(str prom-port ":" prom-port)]
                :volumes ["./gen/prometheus/:/etc/prometheus/:cached"
                          "prometheus-data:/prometheus"]
                :command ["--config.file=/etc/prometheus/prometheus.yml"
                          "--storage.tsdb.path=/prometheus"
                          "--web.enable-lifecycle"
                          "--web.console.libraries=/usr/share/prometheus/console_libraries"
                          "--web.console.templates=/usr/share/prometheus/consoles"]}))))

(defn add-logging [compose cfg]
  (let [logs (:logging cfg)]
    compose))

(defn aidbox-compose [cfg]
  (cond-> 
      {:version "3.7",
       :volumes {:db nil},
       :services
       (let [pg (:db cfg)
             ab (:aidbox cfg)
             lic (:license cfg)]
         {:db {:image (:image pg)
               :ports [(str (:host-port pg) ":" pg-port)],
               :volumes [(str "db:/data")]
               :environment
               {:POSTGRES_USER (:user pg)
                :POSTGRES_PASSWORD (:password pg)
                :POSTGRES_DB (:database pg)}},
          :devbox
          {:image (:image ab)
           :links ["db:db"]
           :ports [(str (:host-port ab) ":" ab-port)],
           :volumes (when (get-in ab [:zen :enable]) ["./zrc:/zrc"])
           :environment {:PGHOST :db
                         :PGPORT pg-port
                         :PGUSER (:user pg)
                         :PGPASSWORD (:password pg)
                         :PGDATABASE (:database pg)
                         :AIDBOX_PORT ab-port 
                         :AIDBOX_LICENSE_ID (:id lic)
                         :AIDBOX_LICENSE_KEY (:key lic)
                         :AIDBOX_STDOUT_PRETTY "ok"
                         :AIDBOX_FHIR_VERSION (:fhir ab)

                         :AIDBOX_ZEN_PATHS    (str "path:dir:" (get-in ab [:zen :paths]))
                         :AIDBOX_ZEN_DEV_MODE (when (get-in ab [:zen :enable]) "enable")
                         :AIDBOX_ZEN_ENTRY (when-let [e (get-in ab  [:zen :entrypoint])] (first (str/split e #"/")))
                         :BOX_ENTRYPOINT      (get-in ab  [:zen :entrypoint])

                         :AIDBOX_ADMIN_ID (get-in ab [:admin :id])
                         :AIDBOX_ADMIN_PASSWORD (get-in ab [:admin :password])

                         :AIDBOX_CLIENT_ID (get-in ab [:client :id])
                         :AIDBOX_CLIENT_SECRET (get-in ab [:client :secret])}}}
         )}
    (get-in cfg [:monitoring :enable])
    (add-prom cfg)

    (get-in cfg [:logging :enable])
    (add-logging cfg))
  )

(defn generate-compose [cfg]
  (spit "docker-compose.yaml" (yaml/generate-string (aidbox-compose cfg)))
  (println "docker-compose.yaml is generated"))

(comment
  (yaml/parse-string (slurp "docker-commpose.yaml.old") {:keywords true})

  (yaml/parse-string (slurp "docker-compose.yaml") {:keywords true})
  (yaml/parse-string (slurp "audit/prometheus/prometheus.yml") {:keywords true})
  (yaml/parse-string (slurp "audit/grafana/provisioning/datasources/all.yaml") {:keywords true})

  (System/getProperty "user.dir")

  (do 
    (def cfg (utils/read-config))

    (aidbox-compose cfg)

    (generate-compose cfg))
  

  )

