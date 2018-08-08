#!/bin/bash
source docker-config.env && sudo -E docker-compose down && sudo -E docker-compose up $@
