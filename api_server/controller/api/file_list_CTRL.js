var fs = require("fs");
const { binOTAPath } = require("../../constants");
const { OTA_Filelist } = require("../../models");

module.exports = async (req, res, next) => {
  const fileNameArray = [];

  await fs.readdir(binOTAPath, async (err, files) => {
    if (err) {
      res.status(400).json({ msg: "Error read binOTA directory!" });
      return console.error(err);
    }
    files.forEach(function (file) {
      fileNameArray.push(file);
    });
    const data = await Promise.all(
      fileNameArray.map(async (file_name) => {
        const filePropertiesDB =
          (await OTA_Filelist.findOne({ file_name }).lean().exec()) || {};
        const {
          commit_message = "",
          filetype = "",
          version = "",
          devicetype = "",
        } = filePropertiesDB;
        const binOTAFilePath = `${binOTAPath}/${file_name}`;
        const { ctimeMs } = await fs.statSync(binOTAFilePath);
        // console.log(fileStat);
        return {
          file_name,
          version,
          ctimeMs,
          filetype,
          commit_message,
          devicetype,
        };
      })
    );
    res.status(200).json({
      data: [...data],

      page: 1,
      success: true,
      total: data.length,
    });
  });
};
