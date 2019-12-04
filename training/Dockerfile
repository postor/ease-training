FROM mxnet/python:latest_gpu_mkl_py3

WORKDIR /training

ADD . .

RUN set -x && \
  pip3 install gluoncv && \
  apt update -y && \
  apt install unzip curl git -y && \
  curl https://deb.nodesource.com/setup_12.x | bash -s -- && \
  cd tools && npm install && cd ..

ENTRYPOINT /training/train.sh