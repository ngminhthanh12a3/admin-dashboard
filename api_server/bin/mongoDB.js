var mongoose = require("mongoose");
// var DB_URL = process.env.DB_URL || "mongodb://localhost:27017/myapp";
var { mongooseOptions, MONGO_URL } = require("../constants");
const connectToMongo = async () => {
  try {
    //   connect to DB
    await mongoose.connect(MONGO_URL, mongooseOptions, (error) => {
      if (error) throw new Error(error);
      console.log("Connect success to MongoDB");
    });
  } catch (error) {
    console.log(error);

    // reconnect to mongoDB
    connectToMongo();
  }
};
exports.connectToMongo = connectToMongo;
