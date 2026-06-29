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

/* Return 404 JSON for any undefined route instead of Express's default HTML page. */
app.use(function (req, res) {
  res.status(404).json({ error: 'Not Found' });
});

/* Centralized error-handling middleware. Express recognises this by its four-parameter
 * signature - it catches any error thrown or passed via next(err) in route handlers. */
app.use(function (err, req, res, next) {
  console.error('Unhandled error on %s %s:', req.method, req.url, err);
  res.status(500).json({ error: 'Internal Server Error' });
});

/* When this file is run directly (node app.js), start listening.
 * When required as a module (e.g. by tests), just export the app. */
if (require.main === module) {
  const server = app.listen(PORT, function () {
    console.log('Running on http://localhost:' + PORT);
  });

  server.on('error', function (err) {
    if (err.code === 'EADDRINUSE') {
      console.error('Error: Port %d is already in use.', PORT);
    } else {
      console.error('Server failed to start:', err.message);
    }
    process.exit(1);
  });
}

process.on('uncaughtException', function (err) {
  console.error('Uncaught exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', function (reason) {
  console.error('Unhandled promise rejection:', reason);
  process.exit(1);
});

module.exports = app;
module.exports.resetCount = function () { count = 0; };
