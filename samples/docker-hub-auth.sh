#!/bin/bash

# example --docker-username={{USER NAME}}  --docker-email={{USER EMAIL}}  --docker-password={{USER PASSWORD}}

kubectl create secret docker-registry docker-hub $@ \
&& \
kubectl patch serviceaccount default -p '{"imagePullSecrets": [{"name": "docker-hub"}]}'
