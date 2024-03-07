#!/bin/bash
set -xe

npm install --save
forever start /usr/local/webapp/app.js

