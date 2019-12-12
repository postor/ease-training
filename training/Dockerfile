FROM mxnet/python:nightly_gpu_cu101_py3

WORKDIR /training

RUN set -x \
  && apt update -y \
  && apt install unzip curl git -y \
  && pip3 install gluoncv numpy --no-cache-dir \
  && curl https://deb.nodesource.com/setup_12.x | bash -s -- \
  && apt install -y nodejs 

COPY ./tools/package*.json ./tools/

RUN set -x \
  && cd tools \
  && npm install

COPY . .

ENTRYPOINT ["/training/train.sh"]
CMD ["-c","print('check https://github.com/postor/ease-training for usage')"]
