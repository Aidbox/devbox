AIDBOX_LICENSE_ID  ?= <your-license-id>
AIDBOX_LICENSE_KEY ?= <your-license-key>

# comment to get unsecured box
AIDBOX_CLIENT_ID     ?= root
AIDBOX_CLIENT_SECRET ?= secret

AIDBOX_PORT         ?= 8888
AIDBOX_FHIR_VERSION ?= 3.0.1


DB_CONTAINER_PORT  = 5432
DB_HOST_PORT      ?= 5436

PGPORT     ?= ${DB_HOST_PORT}
PGUSER     ?= postgres
PGPASSWORD ?= postgres
PGDATABASE ?= devbox

PG_DATA			 ?= ./pg11data
PG_OLD_DATA	 ?= ./pgdata
PG_IMAGE		 ?= aidbox/db:latest
PG_OLD_IMAGE ?= aidbox/aidboxdb:0.0.1-alpha6

AIDBOX_IMAGE ?= healthsamurai/devbox:edge

.EXPORT_ALL_VARIABLES:

docker-up:
	docker-compose -f devbox+db.yaml up

migrate-to-pg11:
	docker-compose -f pg11upgrade.yaml down
	docker-compose -f pg11upgrade.yaml run --rm upgrade-devbox \
/bin/sh -c 'sleep 10s && mkdir -p /backup \
&& echo creating sql backup... \
&& pg_dumpall -h old-devbox-db -U ${PGUSER} > /backup/backup.sql \
&& echo sql backup created \
&& psql -h new-devbox-db < /backup/backup.sql \
&& echo "\pset pager off\n\d+" | psql -h new-devbox-db'
	docker-compose -f pg11upgrade.yaml down

