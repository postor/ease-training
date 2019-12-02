FROM mxnet/python:gpu

RUN set -x && \
  pip3 install gluoncv && \
  apt update -y && \
  apt install unzip curl -y && \
  curl https://deb.nodesource.com/setup_12.x | bash -s --