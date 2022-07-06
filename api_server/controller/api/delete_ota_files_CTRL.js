var fs = require("fs");
const { emitToClient } = require("../../bin/emitToClient");
const { binOTAPath } = require("../../constants");
const { OTA_Field } = require("../../models");
module.exports = async (req, res, next) => {
  const filesName = [...req.body];
  const totalFiles = filesName.length;

  let deletedFiles = 0;

  for await (const file of filesName) {
    const filePath = `${binOTAPath}/${file}`;

    const checkDirectory = fs.existsSync(filePath);
    if (!checkDirectory) break;

    var fileStat = await fs.statSync(filePath);

    const dataDB = await OTA_Field.find({}).lean().exec();
    const { OTA_CURRENT_FIELDS_NAME } = dataDB[0];

    if ((await fileStat.isFile()) && file != OTA_CURRENT_FIELDS_NAME) {
      fs.unlink(filePath, (err) => {});
      deletedFiles++;
    }
  }

  res.status(200).json({
    msg: `Delete ${deletedFiles}/${totalFiles} selected files`,
    type: "info",
  });
  emitToClient("", "reload_file_list");
};
