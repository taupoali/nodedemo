#!/usr/bin/env bash
set -euo pipefail

if ! command -v docker &> /dev/null; then
  echo "Error: docker is not installed or not in PATH." >&2
  exit 1
fi

docker build --tag hodei/sample-service:simple . || {
  echo "Error: Docker build failed." >&2
  exit 1
}
