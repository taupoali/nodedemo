# nodedemo
Simple Node.js counter app with inc and dec functions.
This originated from rkneufeld/nodedemo which is now unavailable.

Dockerfile exposes 8080
Node.js Express configured to listen on 8080

This demo is used with ECS and EKS, both of which use app.js

## How to run locally

```bash
npm install
node app.js
```

## How to test the endpoints

Once running, open a second terminal and use these curl commands:

```bash
curl http://localhost:8080/             # get current count
curl -X PUT http://localhost:8080/inc   # increment count
curl -X PUT http://localhost:8080/dec   # decrement count
```

## How to run with Docker

```bash
docker build -t nodedemo .
docker run -p 8080:8080 nodedemo
```
