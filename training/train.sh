#!/bin/bash
set +x && \
./prepare.sh && \
python3 "$@"