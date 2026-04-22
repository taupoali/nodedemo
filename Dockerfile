FROM node:21-slim

EXPOSE 8080

# COPY is preferred over ADD for simple file copying.
# ADD has extra behaviour (unpacking archives, fetching URLs) that isn't needed here.
COPY package.json package.json

RUN npm install --save

COPY app.js app.js

CMD node app.js
