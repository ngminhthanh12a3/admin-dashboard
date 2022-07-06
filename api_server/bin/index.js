#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require("../app");
var debug = require("debug")("api-server:server");
var http = require("http");

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "3001");
app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  },
});
exports.io = io;

const compeleteInitializeProcess = require("./compeleteInitializeProcess");
compeleteInitializeProcess();
// // connect to mongodb
// var { connectToMongo } = require("./mongoDB");
// connectToMongo();

// var connectSocketClient = require("./connectSocketClient");
// connectSocketClient();

// const {
//   loadDeviceInfoFromDB,
//   loadOTAFieldsFromDB,
//   loadDeviceInfoAnalysis,
// } = require("../handler");
// const { DeviceInfo, OTA_Field, DeviceInfoAnalysis } = require("../models");
// const {
//   chacha20DecryptValue,
//   OTA_current_fields,
//   deviceInfoAnalysis,
// } = require("../constants");
// loadDeviceInfoFromDB(DeviceInfo, chacha20DecryptValue, "DeviceInfo");
// loadOTAFieldsFromDB(OTA_Field, OTA_current_fields, "OTAFields");
// loadDeviceInfoAnalysis(
//   DeviceInfoAnalysis,
//   deviceInfoAnalysis,
//   "DeviceInfoAnalysis"
// );

// // listen to mqtt
// var { listenToMQTT } = require("./listenToMQTT");
// listenToMQTT();

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => console.log(`Server listening on port ${port}`));
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
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
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}

// io.
