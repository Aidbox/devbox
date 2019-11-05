# Aidbox.Dev - Aidbox Developer Version (aka devbox)

This repository contains auxiliary files to help you quickly run
Aidbox.Dev on your local workstation and start creating your first FHIR
application.

## Installation manual

Read more instructions at [Aidbox Documentation page](https://docs.aidbox.app/installation/setup-aidbox.dev)


## Notes

### Upgrade Postgres to 11

In the `latest` version of Aidbox.Dev required PostgreSQL version 11. If you have
already installed Aidbox.Dev with older version of PostgreSQL (9 or 10), you can
migrate your data using migration script.

```sh
 $ make migrate
```

After migration your database dump will be stored in to `./backup/backup.sql` file,
and all PostgreSQL cluster folder will copied in to `pgdata_bk` folder.

Powered by [Health Samurai](http://www.health-samurai.io) | [Aidbox](http://www.health-samurai.io/aidbox) | [Fhirbase](http://www.health-samurai.io/fhirbase)
