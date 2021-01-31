#!/usr/bin/env node

// Import deps
import app from './app';
import fs from 'fs';
const debug = require('debug')('server');
import https from 'https';
import http from 'http';
// Set the port
const port = process.env.PORT || '3001';
app.set('port', port);

// Create http server
let server: https.Server | http.Server;
if (process.env.PROTOCOL === 'https') {
  const httpsOptions: https.ServerOptions = {
    key: fs.readFileSync('./certs/server.key'),
    cert: fs.readFileSync('./certs/server.crt'),
    rejectUnauthorized: false,
  };
  server = https.createServer(httpsOptions, app);
} else {
  server = http.createServer(app);
}

// Listen
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
  debug('Listening on ' + bind);
  console.log('listening');
}
