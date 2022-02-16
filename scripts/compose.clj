(ns compose
  (:require [clj-yaml.core :as yaml]))


(def pg-port 5432)
(def pg-data "./pgdata:/data")
(def ab-port 8080)
(def ab-metrics-port 8089)

(defn aidbox-compose [cfg]
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

                     :AIDBOX_ADMIN_ID (get-in ab [:admin :id])
                     :AIDBOX_ADMIN_PASSWORD (get-in ab [:admin :passoword])

                     :AIDBOX_CLIENT_ID (get-in ab [:client :id])
                     :AIDBOX_CLIENT_SECRET (get-in ab [:client :secret])
                     :BOX_METRICS_PORT ab-metrics-port}}})})

(defn generate-compose [cfg]
  (spit "docker-compose.yaml" (yaml/generate-string (aidbox-compose cfg)))
  (println "docker-compose.yaml is generated"))

(comment
  (yaml/parse-string (slurp "devbox/docker-compose.yaml.old") {:keywords true})
  (System/getProperty "user.dir"))

