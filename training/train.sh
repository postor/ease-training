#!/bin/bash
set +x \
  && ./prepare.sh \
  && echo 'start training ...'
  && python3 "$@"