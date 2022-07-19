module.exports = async () => {
  try {
    var { MongoClient } = require("mongodb");
    // Replace the uri string with your MongoDB deployment's connection string.
    const uri =
      process.env.MONGO_CLIENT_URL ||
      "mongodb+srv://root:example@mongo:3003/mernapp?retryWrites=true&w=majority";

    const client = await new MongoClient(uri);

    // console.log(client, uri);
    await client.connect();

    const database = await client.db("mernapp");
    const collection = await database.collection("deviceinfos");
    const changeStream = await collection.watch();
    changeStream.on("change", (next) => {
      // process any change event
      console.log("received a change to the collection: \t", next);
    });
    // console.log(collection);
    // const simulateAsyncPause = () =>
    //   new Promise((resolve) => {
    //     setTimeout(() => resolve(), 1000);
    //   });

    // let changeStream;
    // console.log(await collection.find());

    // open a Change Stream on the "haikus" collection

    // // set up a listener when change events are emitted

    // await simulateAsyncPause();

    // await collection.insertOne({
    //   title: "Record of a Shriveled Datum",
    //   content: "No bytes, no problem. Just insert a document, in MongoDB",
    // });

    // await simulateAsyncPause();

    // await changeStream.close();

    // console.log("closed the change stream");
  } finally {
    // await client.close();
  }
};
