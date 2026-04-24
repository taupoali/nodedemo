# nodedemo
Simple Node.js counter app with increment, decrement, and reset functions.
This originated from rkneufeld/nodedemo which is now unavailable.

Dockerfile exposes 8080
Node.js Express configured to listen on 8080

This demo is used with ECS and EKS, both of which use app.js

## What this app teaches

- How to create a small HTTP API with Express
- How request handlers receive `req` and `res` objects
- How to return JSON from a route
- How environment variables can configure a Node.js app
- Why in-memory data resets when the app restarts

## How to run locally

```bash
npm install
node app.js
```

## How to test the endpoints

Once running, open a second terminal and use these curl commands:

```bash
curl http://localhost:8080/             # returns {"count":0}
curl -X PUT http://localhost:8080/inc   # increments count, returns no body
curl http://localhost:8080/             # returns {"count":1}
curl -X PUT http://localhost:8080/dec   # decrements count, returns no body
curl -X PUT http://localhost:8080/reset # resets count to 0, returns no body
```

The `PUT` endpoints return `204 No Content`, which means the request worked but
there is no response body to display.

## How to run with Docker

```bash
docker build -t nodedemo .
docker run -p 8080:8080 nodedemo
```

## How to run the API tests

Start the app in one terminal:

```bash
npm start
```

Then run the Cypress API tests in another terminal:

```bash
npm run test:cypress
```
