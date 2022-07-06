const aedes = require("aedes")();
const server = require("net").createServer(aedes.handle);
const port = process.env.PORT || 1883;

const startEvents = () => {
  try {
    server.listen(port, function () {
      console.log(`MQTT Broker running on port: ${port}`);
    });

    // authenticate the connecting client
    aedes.authenticate = (client, username, password, callback) => {
      //password = undefined
      if (!password) {
        console.log(password);
        return callback(null, false);
      }
      password = Buffer.from(password, "base64").toString();
      if (username === "username" && password === "password") {
        return callback(null, true);
      }
      const error = new Error(
        "Authentication Failed!! Invalid user credentials."
      );
      console.log("Error ! Authentication failed.");
      return callback(error, false);
    };

    const topics = [
      "esp/publish",
      "firmware_version",
      "devID/",
      "custom_topic/",
    ];
    // authorizing client to publish on a message topic
    aedes.authorizePublish = (client, packet, callback) => {
      // check topics
      if (topics.find((topic) => packet.topic.includes(topic))) {
        return callback(null);
      }
      console.log("Error ! Unauthorized publish to a topic.");
      return callback(
        new Error("You are not authorized to publish on this message topic.")
      );
    };

    // emitted when a client connects to the broker
    aedes.on("client", function (client) {
      console.log(
        `[CLIENT_CONNECTED] Client ${
          client ? client.id : client
        } connected to broker ${aedes.id}`
      );
    });

    // emitted when a client disconnects from the broker
    // aedes.on("clientDisconnect", function (client) {
    //   console.log(
    //     `[CLIENT_DISCONNECTED] Client ${
    //       client ? client.id : client
    //     } disconnected from the broker ${aedes.id}`
    //   );
    // });

    // emitted when a client subscribes to a message topic
    aedes.on("subscribe", function (subscriptions, client) {
      // console.log(
      //   `[TOPIC_SUBSCRIBED] Client ${
      //     client ? client.id : client
      //   } subscribed to topics: ${subscriptions
      //     .map((s) => s.topic)
      //     .join(",")} on broker ${aedes.id}`
      // );
    });

    // emitted when a client unsubscribes from a message topic
    // aedes.on("unsubscribe", function (subscriptions, client) {
    //   console.log(
    //     `[TOPIC_UNSUBSCRIBED] Client ${
    //       client ? client.id : client
    //     } unsubscribed to topics: ${subscriptions.join(",")} from broker ${
    //       aedes.id
    //     }`
    //   );
    // });

    // emitted when a client publishes a message packet on the topic
    // aedes.on("publish", async function (packet, client) {
    //   if (client) {
    //     console.log(
    //       `[MESSAGE_PUBLISHED] Client ${
    //         client ? client.id : "BROKER_" + aedes.id
    //       } has published message on ${packet.topic} to broker ${aedes.id}`
    //     );
    //   }
    // });
  } catch (error) {
    console.log(error);
    startEvents();
  }
};
startEvents();
