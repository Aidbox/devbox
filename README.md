# Aidbox.Dev - Aidbox Developer Version (aka devbox)

This repository contains auxiliary files to help you quickly run
Aidbox.Dev on your local workstation and start creating your first FHIR
application.

## Installation manual

- Clone the repository
- Copy `.env.tpl` file to `.env` and fill in your `AIDBOX_LICENSE_ID` and `AIDBOX_LICENSE_KEY`. Follow the [instruction](https://docs.aidbox.app/installation/setup-aidbox.dev) to get a license
- Start docker containers
  ```bash
  $ docker compose up
  ```

## Performance tests

- Download [infrabox jar](https://storage.googleapis.com/libox/infrabox/genops.jar).
- Run performance test:
  ```
  $ java -cp '/path/to/genops.jar' perfbox.core http://localhost:8888 root secret
  ```
- Go to 'Performance test (Aidbox)' Grafana dashboard on http://localhost:3000

Now you should see performance plots.

### How testing works

#### On start-up

Test suite truncates `Patient` and `Encounter` tables then creates set of search parameters indexes in order to reach the best performance

- `Patient.name`
- `Patient.name.family`
- `Patient.​birthDate`

#### Testing

This performance tests run test suit on 2, 4, 8, and 16 threads. Each thread executes test 5000 times.
Each test does the following:
1. Creates Patient resource
2. Reads Patient by id
3. Creates Encounter resource
4. Reads Encounter by id
5. Searches count of Patients by name and birthDate
6. Searches count of Patients by family
