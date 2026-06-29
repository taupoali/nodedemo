#!/bin/bash
set -xe

# Delegate to the canonical build script at the repo root.
"$(git rev-parse --show-toplevel)/build.sh"
