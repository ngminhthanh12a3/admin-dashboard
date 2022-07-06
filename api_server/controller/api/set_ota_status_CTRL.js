const { emitToClient } = require("../../bin/emitToClient");
const { OTA_Field } = require("../../models");

module.exports = async (req, res, next) => {
  const {
    OTA_DEVICE_TYPE = "",
    OTA_FILETYPE = "",
    OTA_ENABLE = true,
  } = req.body;

  const returnDBData = await OTA_Field.findOneAndUpdate(
    { OTA_DEVICE_TYPE, OTA_FILETYPE },
    { OTA_ENABLE }
  )
    .lean()
    .exec();

  if (returnDBData) {
    const { OTA_ENABLE = OTA_ENABLE } = await OTA_Field.findOne({
      OTA_DEVICE_TYPE,
      OTA_FILETYPE,
    })
      .lean()
      .exec();

    const message = `${OTA_DEVICE_TYPE} ${OTA_FILETYPE} OTA`;

    const OTA_STATUS = OTA_ENABLE ? "Enabled" : "Disabled";
    const description = `Status: ${OTA_STATUS}`;
    res.status(200).json({ type: "success", message, description });
  } else res.status(400).json({ type: "error" });

  const OTA_FieldDBData = (await OTA_Field.find().lean().exec()) || [];
  emitToClient(
    // {
    //   OTA_CURRENT_VERSION,
    //   OTA_LATES_UPDATE,
    // },
    [...OTA_FieldDBData],
    "OTA_Update"
  );
};
