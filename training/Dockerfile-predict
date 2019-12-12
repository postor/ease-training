FROM postor/ease-training

WORKDIR /training

RUN set -x \
  && apt install -y libglib2.0-0 libsm6 libxext6 libxrender-dev \
  && pip3 install opencv-python==3.4.8.29 --no-cache-dir

ENTRYPOINT ["python3","predict.py"]
CMD ["-h"]

