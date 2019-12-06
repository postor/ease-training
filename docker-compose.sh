#!/bin/bash
set +x && \
cat .env > local.env && \
printf "\nSHARED_FILES=$(pwd)/shared-files" >> local.env && \
docker-compose "$@"