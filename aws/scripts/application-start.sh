#!/bin/bash
set -xe

export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  \. "$NVM_DIR/nvm.sh"
else
  echo "Error: nvm is not installed at $NVM_DIR/nvm.sh" >&2
  exit 1
fi

if ! command -v pm2 &> /dev/null; then
  echo "Error: pm2 is not installed. Run 'npm install -g pm2' first." >&2
  exit 1
fi

if [ ! -f /usr/local/webapp/app.js ]; then
  echo "Error: /usr/local/webapp/app.js not found" >&2
  exit 1
fi

pm2 start /usr/local/webapp/app.js
