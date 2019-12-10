#!/bin/bash
set -x \
  && ./prepare.sh \
  && echo "$@" \
  && python3 "$@"