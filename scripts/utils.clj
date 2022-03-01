(ns utils
  (:require
   [clojure.edn :as edn]))


(defn read-config []
  (let [lic (edn/read-string (slurp "license.edn"))]
    (assoc (edn/read-string (slurp "aidbox.edn")) :license lic)))

(comment
  (read-config)

  )
