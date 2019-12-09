FROM node:10-alpine

ARG DOCKER_CLI_VERSION="19.03.5"
ENV DOWNLOAD_URL="https://download.docker.com/linux/static/stable/x86_64/docker-$DOCKER_CLI_VERSION.tgz"

# install docker client
RUN set -x \
  && apk --update add curl \
  && mkdir -p /tmp/download \
  && echo $DOWNLOAD_URL \
  && curl -L $DOWNLOAD_URL | tar -xz -C /tmp/download \
  && mv /tmp/download/docker/docker /usr/local/bin/ \
  && rm -rf /tmp/download \
  && apk del curl \
  && rm -rf /var/cache/apk/*

WORKDIR /runner
COPY package*.json ./

RUN set -x && \
  npm install

COPY . .

CMD ./run.sh