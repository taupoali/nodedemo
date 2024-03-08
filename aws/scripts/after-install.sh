#!/bin/bash
set -xe

nvm install --lts
npm install --save
forever start /usr/local/webapp/app.js

