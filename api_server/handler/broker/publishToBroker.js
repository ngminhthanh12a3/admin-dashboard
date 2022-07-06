module.exports = (topic = "", message = "") => {
  const { client } = require("../../bin/listenToMQTT");
  // const topic = `devID/${devID}/${topicKey}`;

  client.publish(topic, message, { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error);
    }
  });
};
