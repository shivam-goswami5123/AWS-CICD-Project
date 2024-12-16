#!/bin/bash


# Pull the Docker image from Docker Hub
docker pull shivamgoswami5123/todo-app:latest

# Stop and remove any existing container (if it's running)
if [ "$(docker ps -q -f name=todo-app)" ]; then
  docker stop todo-app
  docker rm todo-app
fi

# Start the Docker container
docker run -d --name todo-app -p 3000:3000 your-docker-username/todo-app:latest
