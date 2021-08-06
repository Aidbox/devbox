.EXPORT_ALL_VARIABLES:

up:
	docker-compose up -d

update:
	docker-compose pull
	docker-compose up -d

down:
	docker-compose down

stop:
	docker-compose stop

restart:
	docker-compose restart
