FROM node:21-slim

EXPOSE 8080

ADD package.json package.json

RUN npm install --save

ADD app.js app.js

CMD node app.js
