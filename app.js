/* A simple web service for Hodei demos
/* Based on rkneufeld 
 *
 * This service exposes three endpoints:
 * - GET /    - Returns 200 with JSON body containing the current service count.
 * - PUT /inc - Increment the service count. Returns 204 (success, no content).
 * - PUT /dec - Decrement the service count. Returns 204 (success, no content).
 */

var express = require('express');
var morgan = require('morgan');

/* Use the PORT environment variable if set, otherwise default to 8080.
 * This is a common Node.js pattern that makes the app flexible across environments. */
var PORT = process.env.PORT || 8080;

/* count is stored in memory - it resets to 0 every time the app restarts.
 * In a real app you would persist this in a database. */
var count = 0;

var app = express();

/* Morgan is a logger, so we can see the HTTP methods at console and their status */
app.use(morgan('[:date[iso]] :method :url\t:status'));

app.get('/', function (req, res) {
  res.status(200).send({count: count});
});

app.put('/inc', function (req, res) {
  count += 1;
  res.status(204).end(); // 204 = success, no content to return
});

app.put('/dec', function (req, res) {
  count -= 1;
  res.status(204).end(); // 204 = success, no content to return
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
