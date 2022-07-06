const { emitToClient } = require("../../bin/emitToClient");
const { brokerRequest } = require("../../constants");

module.exports = (devID) => {
  // exit if no request
  if (!brokerRequest[devID]) return;

  const { client } = require("../../bin/listenToMQTT");

  // fix error
  if (!client) return;

  for (const topicKey in brokerRequest[devID]) {
    const message = brokerRequest[devID][topicKey];
    const topic = `devID/${devID}/${topicKey}`;

    client.publish(topic, message, { qos: 0, retain: false }, (error) => {
      if (error) {
        console.error(error);
      }
    });

    // emit notification
    emitToClient(
      {
        type: "success",
        message: "Sent Broker request",
        description: `${topicKey}: ${message}`,
      },
      "notification"
    );
  }
  delete brokerRequest[devID];
};
