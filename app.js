/* A simple web service for O'Reilly's Docker on AWS video series
 *
 * This service exposes four endpoints:
 * - GET /        - Returns 200 with JSON body containing the current service
 *                  count.
 * - GET /version - Returns JSON describing the service version.
 * - PUT /inc     - Increment the service count. Returns 204.
 * - PUT /dec     - Decrement the service count. Returns 204.
 */

var express = require('express');
var morgan = require('morgan');

var PORT = process.env.PORT || 8080;
var count = 0;

var app = express();

app.use(morgan('[:date[iso]] :method :url\t:status'));

app.get('/', function (req, res) {
  res.status(200).send({count: count});
});

app.put('/inc', function (req, res) {
  count += 1;
  res.status(204).end();
});

app.put('/dec', function (req, res) {
  count -= 1;
  res.status(204).end();
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
