#!/bin/bash
set -xe

# Load nvm so that the correct version of Node.js is available.
# The previous version of this script used a hardcoded path to a specific Node
# version, which broke silently whenever Node was upgraded.
export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  \. "$NVM_DIR/nvm.sh"
else
  echo "Error: nvm is not installed at $NVM_DIR/nvm.sh" >&2
  exit 1
fi

# pm2 is a process manager that keeps the app running and restarts it on crash.
# Check it exists before trying to use it.
if ! command -v pm2 &> /dev/null; then
  echo "Error: pm2 is not installed. Run 'npm install -g pm2' first." >&2
  exit 1
fi

# Make sure the application file actually exists before we ask pm2 to run it.
if [ ! -f /usr/local/webapp/app.js ]; then
  echo "Error: /usr/local/webapp/app.js not found" >&2
  exit 1
fi

pm2 start /usr/local/webapp/app.js
