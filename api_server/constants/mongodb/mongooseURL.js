const MONGO_USERNAME = process.env.MONGO_USERNAME || "root";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "example";
const MONGO_SERVICE = process.env.MONGO_SERVICE || "mongo";
const MONGO_PORT = process.env.MONGO_PORT || "27017";
const MONGO_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_SERVICE}:${MONGO_PORT}`;

module.exports = process.env.MONGO_URL || MONGO_URL;
