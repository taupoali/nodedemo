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
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

/* Use the PORT environment variable if set, otherwise default to 8080.
 * This is a common Node.js pattern that makes the app flexible across environments. */
const PORT = process.env.PORT || 8080;

/* count is stored in memory - it resets to 0 every time the app restarts.
 * In a real app you would persist this in a database. */
let count = 0;

const app = express();

/* Disable the X-Powered-By header to avoid revealing the framework. */
app.disable('x-powered-by');

/* Helmet sets various HTTP security headers (Content-Security-Policy, etc.). */
app.use(helmet());

/* Rate-limit all requests: max 100 requests per 15-minute window per IP. */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

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

/* If a request doesn't match any route above, it ends up here.
 * Without this, Express would send a confusing HTML page.
 * We send a clear JSON message and a 404 status code ("Not Found"). */
app.use(function (req, res) {
  res.status(404).json({ error: 'Not Found' });
});

/* This is an error-handling middleware. Express knows it handles errors because
 * it has four parameters instead of the usual two (req, res).
 * If any route above throws an error or calls next(err), Express skips the
 * normal handlers and jumps straight here. We log the error and send a
 * generic 500 response so the client knows something went wrong. */
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

  /* If the server can't start (e.g. another process already uses this port),
   * Node.js emits an 'error' event. Without this handler the error would be
   * thrown as an unhandled exception with a confusing stack trace.
   * Instead we print a helpful message and exit. */
  server.on('error', function (err) {
    if (err.code === 'EADDRINUSE') {
      console.error('Error: Port %d is already in use.', PORT);
    } else {
      console.error('Server failed to start:', err.message);
    }
    process.exit(1);
  });
}

/* These two handlers catch programming mistakes that would otherwise crash the
 * app silently. 'uncaughtException' fires when an error is thrown but never
 * caught. 'unhandledRejection' fires when a Promise rejects and nothing handles
 * the rejection. In both cases we log the problem and exit so it doesn't go
 * unnoticed. */
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
