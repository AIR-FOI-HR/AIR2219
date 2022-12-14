#! /bin/sh

cd src/db/entrypoint

docker stop eflush-db;

docker rm eflush-db;

docker volume rm entrypoint_eflush-persist

docker-compose up -d eflush-db;