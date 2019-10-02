#!/usr/bin/env bash


echo "Building Docker"
docker-compose build

echo "Running Docker"
docker-compose up -d

while [ "$(curl -I -s localhost:15672 | head -n 1 | cut '-d ' '-f2')"  != "200" ]
do
    echo "Waiting for rabbit for Rabbit..."
    sleep 3;
done;

echo "Running workers"
docker exec -it php bash -c "pm2 start /home/wwwroot/app/imgix/imgix.py"
docker exec -it php bash -c "yarn encore dev"

xdg-open http://localhost &