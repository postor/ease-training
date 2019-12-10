#!/bin/bash
set +x 
docker network create ease-training
cat .env > local.env 
printf "\nSHARED_FILES=$(pwd)/shared-files" >> local.env 
docker-compose pull
docker-compose build