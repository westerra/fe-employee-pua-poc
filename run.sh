#!/bin/bash
# set -e
# ENV=$1

# npm run build:$ENV;
# mvn bb:import-packages -P$ENV;

npm install --legacy-peer-deps
npm run start
npm run build