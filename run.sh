#!/usr/bin/env bash
set -euo pipefail

if ! command -v docker &> /dev/null; then
  echo "Error: docker is not installed or not in PATH." >&2
  exit 1
fi

echo "Launching Sample Service..."
echo "Press <ctrl-c> to exit."

docker run --tty \
           --interactive \
           --rm \
           --publish 8080:8080 \
           --name "sample-service" \
           hodei/sample-service:simple || {
  echo "Error: Failed to start the container. Is port 8080 already in use?" >&2
  exit 1
}

