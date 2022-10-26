#! /bin/sh

cd src/db/entrypoint

docker stop eflush-db;

docker rm eflush-db;

docker-compose up -d;