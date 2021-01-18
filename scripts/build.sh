#!/bin/bash

CMD="npm run lerna -- run build --parallel --no-bail --include-dependencies"

for el in "$@"; do
  CMD="$CMD --scope \"*/$el\""
done

CMD="$CMD"

eval $CMD
