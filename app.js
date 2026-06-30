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

/* counterAction is a "higher-order function" — a function that returns another
 * function. This is a common JavaScript pattern for removing duplication.
 * Each PUT route needs to (1) update the count and (2) send a 204 response.
 * Instead of writing that logic three times, we write it once here and pass
 * in just the part that differs: the update step. */
function counterAction(updateFn) {
  return function (req, res) {
    updateFn();
    res.status(204).end();
  };
}

/* req is the request from the client. res is the response we send back. */
app.get('/', function (req, res) {
  res.status(200).json({ count });
});

/* Each route below uses counterAction (defined above) with an arrow function
 * that describes what to change. The arrow function () => { count += 1 } is
 * shorthand for function () { count += 1 }. */
app.put('/inc', counterAction(() => { count += 1; }));
app.put('/dec', counterAction(() => { count -= 1; }));
app.put('/reset', counterAction(() => { count = 0; }));

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
