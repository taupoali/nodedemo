/* A simple web service for Node.js demos.
 *
 * This service exposes four endpoints:
 * - GET /      - Returns JSON containing the current count.
 * - PUT /inc   - Increments the count.
 * - PUT /dec   - Decrements the count.
 * - PUT /reset - Resets the count to 0.
 */

const express = require('express');
const morgan = require('morgan');

/* Use the PORT environment variable if set, otherwise default to 8080.
 * This is a common Node.js pattern that makes the app flexible across environments. */
const PORT = process.env.PORT || 8080;

/* count is stored in memory - it resets to 0 every time the app restarts.
 * In a real app you would persist this in a database. */
let count = 0;

const app = express();

/* Morgan logs each HTTP request, including the method, URL, and response status. */
app.use(morgan('[:date[iso]] :method :url\t:status'));

/* req is the request from the client. res is the response we send back. */
app.get('/', function (req, res) {
  res.status(200).json({ count });
});

app.put('/inc', function (req, res) {
  count += 1;
  res.status(204).end(); // 204 = success, no content to return
});

app.put('/dec', function (req, res) {
  count -= 1;
  res.status(204).end(); // 204 = success, no content to return
});

app.put('/reset', function (req, res) {
  count = 0;
  res.status(204).end(); // 204 = success, no content to return
});

app.listen(PORT, function () {
  console.log('Running on http://localhost:' + PORT);
});
