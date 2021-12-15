# Aidbox.Dev - Aidbox Developer Version (aka devbox)

This repository contains auxiliary files to help you quickly run
Aidbox.Dev on your local workstation and start creating your first FHIR
application.

## Installation manual

Read more instructions at [Aidbox Documentation page](https://docs.aidbox.app/installation/setup-aidbox.dev)

## Performance tests
- Download [infrabox jar](https://storage.cloud.google.com/libox/infrabox/genops.jar).
- Start docker containers
  ```bash
  $ docker compose up
  ```
- Run performance test:
  ```
  $ java -cp '/path/to/infrabox/genops.jar' perfbox.core http://localhost:8888 root secret
  ```
- Go to 'Performance test (Aidbox)' Grafana dashboard on http://localhost:3000

Now you should see performance plots.

This performance tests run test suit on 2, 4, 8, and 16 threads. Each thread executes test 5000 times.
Each test does the following:
1. Creates Patient resource
2. Reads Patient by id
3. Creates Encounter resource
4. Reads Encounter by id
5. Searches count of Patients by name and birthdate
6. Searches count of Patients by family
