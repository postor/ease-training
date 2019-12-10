FROM nvidia/cuda:10.1-devel

WORKDIR /training

RUN set -x \
  && apt update -y \
  && apt install python3 python3-pip unzip curl git -y \
  && pip3 install mxnet-cu101 gluoncv numpy \
  && curl https://deb.nodesource.com/setup_12.x | bash -s -- \
  && apt install -y nodejs 


COPY ./tools/package*.json ./tools/

RUN set -x \
  && cd tools \
  && npm install

COPY . .

ENTRYPOINT ./train.sh