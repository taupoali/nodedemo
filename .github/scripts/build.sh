#!/bin/bash
set -xe

# Instead of duplicating the docker build command here, we call the build
# script at the repo root. This way the build logic lives in one place.
# "git rev-parse --show-toplevel" returns the absolute path to the repo root
# no matter which directory this script is run from.
"$(git rev-parse --show-toplevel)/build.sh"
