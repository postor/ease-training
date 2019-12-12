#!/bin/bash
set -x \
  && ./prepare.sh \
  && mkdir -p /out-classes \
  && cp classes.py /out-classes \
  && python3 "$@"