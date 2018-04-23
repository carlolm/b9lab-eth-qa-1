kubectl create secret docker-registry docker-credentials --namespace event-watcher \
  --docker-server=https://index.docker.io/v1/ \
  --docker-username=$DOCKER_USER \
  --docker-password=$DOCKER_PASSWORD \
  --docker-email=$DOCKER_EMAIL

# kubectl delete secret docker-credentials --namespace event-watcher