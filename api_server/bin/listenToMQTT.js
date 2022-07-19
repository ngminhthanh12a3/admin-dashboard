const mqtt = require("mqtt");

const host = process.env.BROKER_HOST || "localhost";
const port = process.env.BROKER_PORT || "1883";
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const connectUrl = `mqtt://${host}:${port}`;
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: "username",
  password: "password",
  reconnectPeriod: 1000,
});

module.exports.client = client;

const topic = "esp/publish";

const start = () => {
  client.on("connect", () => {
    console.log("MQTT Connected");
    client.subscribe([topic], () => {
      console.log(`MQTT Subscribe to topic '${topic}'`);
    });
    //   client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
    //     if (error) {
    //       console.error(error)
    //     }
    //   })
  });
  var { emitToClient } = require("./emitToClient");
  var {
    chacha20DecryptHandler,
    handleDecryptValue,
    // sendRequestToBroker,
    handleDeviceInfoAnalysis,
  } = require("../handler");

  client.on("message", (topic, payload) => {
    const decryptJSON = chacha20DecryptHandler(payload, "1");
    handleDecryptValue(decryptJSON);

    const { devID, ...props } = decryptJSON;

    handleDeviceInfoAnalysis(devID, props);

    const emitJSON = {};
    emitJSON[devID] = props;

    // emit to clients
    emitToClient(emitJSON, "encryptDT"); //
  });
};
module.exports.listenToMQTT = async () => {
  try {
    await start();
  } catch (err) {
    console.error("Restart MQTT", err);
    await start();
  }
};
