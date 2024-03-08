#!/bin/bash
set -xe


export PATH=$PATH:/root/.nvm/versions/node/v20.11.1/bin/pm2
source ~/.bashrc

pm2 start /usr/local/webapp/app.js
