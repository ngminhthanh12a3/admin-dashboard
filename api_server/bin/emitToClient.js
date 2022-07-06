exports.emitToClient = (data, event = "") => {
  const { io } = require("./index");
  io.emit(event, data);
};
