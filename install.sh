#!/usr/bin/env bash

echo "Building Docker"
docker-compose build

echo "Running Docker"
docker-compose up -d

echo "Composer"
docker exec -it php bash -c "composer install"

echo "Database schema creation"
docker exec -it php bash -c "bin/console doctrine:schema:update --force"

echo "Webpack"
docker exec -it php bash -c "yarn encore dev"

echo "Sockets install"
docker exec -it php bash -c "cd ../socket && yarn install"

echo "READY! Use 'sh run.sh' to run the application"