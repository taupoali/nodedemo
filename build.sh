#!/usr/bin/env bash

# "set -euo pipefail" makes the script stop immediately if anything fails.
# Without it, a failed command would be ignored and the script would continue,
# hiding the real problem.
set -euo pipefail

# Check that Docker is installed before trying to use it.
# "command -v docker" asks the shell where the docker program is.
# If it can't find it, we print a helpful message and stop.
if ! command -v docker &> /dev/null; then
  echo "Error: docker is not installed or not in PATH." >&2
  exit 1
fi

# Build the Docker image. The "|| { ... }" part runs only if the build fails,
# giving the user a clear message instead of a silent failure.
docker build --tag hodei/sample-service:simple . || {
  echo "Error: Docker build failed." >&2
  exit 1
}
