# Docker hub: carlol/jenkins-eth:v1

FROM node
FROM jenkins

# Dockerfile author / maintainer 
LABEL maintainer="Carlo P. Las Marias <carlol@gmail.com>"

COPY --from=0 /usr/local  /usr/local
RUN npm --version
RUN npm install -g truffle
RUN npm install -g ganache-cli
RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "vim"]