#!/bin/bash
set -x && \
unzip /dataset.zip -d ./VOCLike && \
node tools/collect-classes.js
