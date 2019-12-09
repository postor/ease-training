FROM nvidia/cuda:10.1-devel

WORKDIR /training

RUN set -x \
  && apt update -y \
  && apt install python3 python3-pip libcublas10 unzip curl git -y \
  && pip3 install mxnet-cu101 gluoncv numpy \
  && curl https://deb.nodesource.com/setup_12.x | bash -s -- \
  && apt install -y nodejs 


ADD . .
RUN set -x \
  && cd tools \
  && npm install

ENTRYPOINT ./train.sh