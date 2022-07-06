var { otaRouter } = require("../../routes");
module.exports = (app) => {
  app.use("/deviceapi", otaRouter);
};
