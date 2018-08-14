#!/bin/bash
cd ..
helm package devbox
helm repo index . --url https://aidbox.github.io/devbox/
