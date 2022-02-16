# Aidbox.Dev - Aidbox Developer Version (aka Devbox)

This repository contains auxiliary files to help you quickly run
Aidbox.Dev on your local workstation and start creating your first FHIR
application.

## Prerequisites

* docker-compose
* [babashka](https://book.babashka.org/#_installation)

## Installation manual

```
git clone https://github.com/Aidbox/devbox
cd devox
bb config
> license-id ...
> license-key ..

bb tasks

```

## Configuration

All configuration is in aidbox.edn (EDN is like JSON  [read more](https://learnxinyminutes.com/docs/edn/))

```edn

{:aidbox
 {:image "healthsamurai/devbox:edge"
  ;; :image "healthsamurai/devbox:stable"
  ;; :image "healthsamurai/devbox:latest"
  :fhir "4.0.1"
  :host-port 8888
  :admin  {:id "admin" :password "secret"}
  :client {:id "root" :secret "secret"}
  :logs :stdout
  :zen {:desc "Enable zen project"
        :enable false
        :path "project"
        ;; enable dev mode
        :dev-mode true}
  :config {:search {:timeout 10 :count 30}
           :debug  {:policy true}}}


 :db
 {:image "healthsamurai/aidboxdb:13.2"
  :user "postgres"
  :password "postgres"
  :database "devbox"
  :host-port 5437}

 :elastic
 {:desc "Enable loging to Elastic"
  :enable false}

 :monitoring
 {:desc "Enable Prometheus monitoring"
  :enable false}

 :apm
 {:desc "Enable Elastic APM"
  :enable false}

 :perf
 {:desc "Configure performance tests"}}

```
