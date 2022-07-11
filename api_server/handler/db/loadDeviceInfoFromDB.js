const { clearBitFromFormatData } = require("../formatData");

module.exports = async (Model, formatData, dbInitialTitle) => {
  const dataArray = await Model.find().lean().exec();

  await dataArray.forEach((data) => {
    // reset wifi_status
    // data["wifi_status"] = "DEACTIVE";
    clearBitFromFormatData(data, 0x1, 1, "status");

    const { devID, _id, __v, ...props } = data;
    formatData[devID] = props;
  });
};
