#!/bin/bash
set -xe

# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
# source ~/.bashrc

export NVM_DIR="$HOME/.nvm"

if [ ! -s "$NVM_DIR/nvm.sh" ]; then
  echo "Error: nvm is not installed at $NVM_DIR/nvm.sh" >&2
  exit 1
fi

\. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# nvm install --lts

cd /usr/local/webapp

if [ ! -f "package.json" ]; then
  echo "Error: package.json not found in /usr/local/webapp" >&2
  exit 1
fi

npm install --save
