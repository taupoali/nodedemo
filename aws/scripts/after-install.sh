#!/bin/bash

# -x prints each command before it runs (useful for debugging deploys).
# -e stops the script if any command fails.
set -xe

# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
# source ~/.bashrc

export NVM_DIR="$HOME/.nvm"

# Make sure nvm (Node Version Manager) is installed before we try to load it.
# Without this check, the script would silently skip loading nvm and then fail
# later with a confusing "npm: command not found" error.
if [ ! -s "$NVM_DIR/nvm.sh" ]; then
  echo "Error: nvm is not installed at $NVM_DIR/nvm.sh" >&2
  exit 1
fi

\. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# nvm install --lts

cd /usr/local/webapp

# Verify the application was actually copied to this directory before installing.
if [ ! -f "package.json" ]; then
  echo "Error: package.json not found in /usr/local/webapp" >&2
  exit 1
fi

npm install --save
