exports.mongooseOptions = require("./mongodb").mongooseOptions;
exports.MONGO_URL = require("./mongodb").MONGO_URL;

exports.chacha20DecryptValue = {};
exports.deviceStatusTimeoutID = {};

exports.OTA_current_fields = { OTA_CURRENT_FIELDS_NAME: "" };

exports.brokerRequest = {};

exports.deviceInfoAnalysis = {};

var path = require("path");
exports.binOTAPath = path.join(process.cwd(), "binOTA");
