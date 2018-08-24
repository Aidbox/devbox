#!/bin/bash
helm package devbox
helm repo index . --url https://aidbox.github.io/devbox/helm
mv index.yaml ..
