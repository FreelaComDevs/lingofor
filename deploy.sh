#!/bin/bash

pemfile="$HOME/LingoAWS.pem"
container="lingo_react"
user="ec2-user"
dev_host="ec2-18-212-111-59.compute-1.amazonaws.com"
port="3000"

if [ $1 == "dev" ]; then
  ssh -i $pemfile $user@$dev_host mkdir $container
  rsync --progress --exclude-from "ignore.exclude" -avz -e "ssh -i $pemfile " .  $user@$dev_host:$container
  scp -i $pemfile build/.env.dev $user@$dev_host:/home/$user/$container/lingoforme/.env
  scp -i $pemfile build/Dockerfile.dev $user@$dev_host:/home/$user/$container/Dockerfile
  scp -i $pemfile build/docker-compose-dev.yml $user@$dev_host:/home/$user/$container/docker-compose.yml
  ssh -i $pemfile $user@$dev_host "cd $container && docker-compose build"
  ssh -i $pemfile $user@$dev_host docker rm -f $container
  ssh -i $pemfile $user@$dev_host "cd $container && docker-compose run -d --name $container -p $port:$port $container"
  ssh -i $pemfile $user@$dev_host rm -fr $container
  exit 0
fi
