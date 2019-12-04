FROM node:10-alpine

ARG DOCKER_CLI_VERSION="docker-19.03.5"
ENV DOWNLOAD_URL="https://download.docker.com/linux/static/stable/x86_64/docker-$DOCKER_CLI_VERSION.tgz"

# install docker client
RUN apk --update add curl \
  && mkdir -p /tmp/download \
  && curl -L $DOWNLOAD_URL | tar -xz -C /tmp/download \
  && mv /tmp/download/docker/docker /usr/local/bin/ \
  && rm -rf /tmp/download \
  && apk del curl \
  && rm -rf /var/cache/apk/*

WORKDIR /webapp
COPY package*.json ./

RUN set -x && \
  npm install

COPY . .

RUN set -x && \
  npm run build

ENV NODE_ENV production

CMD node server.js