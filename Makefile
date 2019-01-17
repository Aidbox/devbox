PGUSER     = postgres
PGPASSWORD = postgres
PGDATABASE = devbox

PG_OLD_DATA	= ./pgdata
PG_OLD_IMAGE = aidbox/aidboxdb:0.0.1-alpha6

PG_DATA		  = ./pg11data
PG_IMAGE	   = aidbox/db:11.1.0

.EXPORT_ALL_VARIABLES:

.SILENT: migrate rollback

rollback:
	echo "Rollback from: ${PG_OLD_DATA}_bk"
	echo "Backup your current pgdata folder.."
	mv ${PG_OLD_DATA}	${PG_OLD_DATA}_rollback_backup
	mv ${PG_OLD_DATA}_bk	${PG_OLD_DATA}
	echo "\n"
	echo "Done!"
	echo "Backup pgdata folder: ${PG_OLD_DATA}_rollback_backup"

migrate:
	docker-compose down
	docker-compose -f pg11upgrade.yaml down
	docker-compose -f pg11upgrade.yaml up -d
	echo "Backup and upgrade devbox database"
	docker-compose -f pg11upgrade.yaml exec new-devbox-db \
/bin/sh -c 'sleep 30s && mkdir -p /backup \
&& echo Creating sql backup... \
&& pg_dumpall -h old-devbox-db > /backup/backup.sql \
&& echo SQL backup created \
&& psql -f /backup/backup.sql \
&& psql -c "delete from searchparameter where resource#>>'\''{resource,id}'\''  = '\''TestScript'\''; " \
&& psql -c "delete from attribute where resource#>>'\''{resource,id}'\''  = '\''TestScript'\''; " \
&& echo "\pset pager off\n\d+" | psql -h new-devbox-db'
	docker-compose -f pg11upgrade.yaml down
	mv ${PG_OLD_DATA}	 ${PG_OLD_DATA}_bk
	mv ${PG_DATA} ${PG_OLD_DATA}
	echo "\n"
	echo "Successfully upgraded!"
	echo "Backuped pgdata folder: ${PG_OLD_DATA}_bk"
	echo "Backup sql file: ./backup/backup.sql"

