const { publishToBroker } = require("../../handler");

module.exports = (req, res, next) => {
  const { devID, topicKey, message } = req.body;

  const topic = `devID/${devID}/${topicKey}`;
  publishToBroker(topic, message);

  res.status(200).json({ success: "Requet is sent" });
};
