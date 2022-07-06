const { publishToBroker } = require("../../handler");

module.exports = (req, res, next) => {
  const { custom_topic = "custom_topic/", custom_message = "" } = req.body;

  publishToBroker(custom_topic, custom_message);
  res
    .status(200)
    .json({
      type: "success",
      message: "Custom Broker Request Success",
      description: `Topic: ${custom_topic}, message: ${custom_message}`,
    });
};
