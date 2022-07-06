const moment = require("moment");
module.exports = (analysisArray, value, initialSize = 10) => {
  if (!analysisArray["temperature"])
    analysisArray["temperature"] = Array(initialSize);
  // analysisArray["temperature"] = [];

  // analysisArray["temperature"].length = 360;

  analysisArray["temperature"].shift();

  const offsetHour = 7;
  const UTCTime = new Date();
  // take offsetHour
  UTCTime.setHours(UTCTime.getHours() + offsetHour);

  analysisArray["temperature"].push({
    date: moment(UTCTime.getTime()).format("HH:mm:ss"),
    type: "temperature",
    value,
  });
  // analysisArray["temperature"].forEach((element, index) => {
  //   analysisArray["temperature"][index] = {
  //     date: moment(UTCTime.getTime()).format("HH:mm:ss"),
  //     type: "temperature",
  //     value,
  //   };
  // });
};
