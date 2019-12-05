FROM node:10-alpine

WORKDIR /webapp
COPY package*.json ./

RUN set -x && \
  npm install

COPY . .

RUN set -x && \
  npm run build

ENV NODE_ENV production

CMD node server.js