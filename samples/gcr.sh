#!/bin/bash
kubectl create secret docker-registry docker-hub \
        --docker-username={{USER NAME}} \
        --docker-email={{USER EMAIL}} \
        --docker-password={{USER PASSWORD}}

kubectl patch serviceaccount default \
        -p '{"imagePullSecrets": [{"name": "docker-hub"}]}'
