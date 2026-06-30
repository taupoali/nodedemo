#!/usr/bin/env bash

# Stop the script immediately if any command fails.
set -euo pipefail

# Make sure Docker is available before we try to use it.
if ! command -v docker &> /dev/null; then
  echo "Error: docker is not installed or not in PATH." >&2
  exit 1
fi

echo "Launching Sample Service..."
echo "Press <ctrl-c> to exit."

# Start the container. If "docker run" fails (e.g. the port is already taken
# by another process), the "|| { ... }" block prints a helpful hint.
docker run --tty \
           --interactive \
           --rm \
           --publish 8080:8080 \
           --name "sample-service" \
           hodei/sample-service:simple || {
  echo "Error: Failed to start the container. Is port 8080 already in use?" >&2
  exit 1
}

