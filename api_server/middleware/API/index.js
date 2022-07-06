var { apiRouter } = require("../../routes");
module.exports = (app) => {
  app.use("/api", apiRouter);
};
