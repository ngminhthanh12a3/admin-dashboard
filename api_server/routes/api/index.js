var express = require("express");
const {
  analysisCTRL,
  file_list_CTRL,
  delete_ota_files_CTRL,
  set_ota_status_CTRL,
  send_custom_broker_request_CTRL,
  device_list_CTRL,
} = require("../../controller");
const {
  set_broker_request_CTRL,
  currentUser_CTRL,
} = require("../../controller/api");
const device_info_load_CTRL = require("../../controller/api/device_info_load_CTRL");
var router = express.Router();

router.use("/analysis", analysisCTRL);

router.get("/device_info_load", device_info_load_CTRL);
router.post("/set_broker_request", set_broker_request_CTRL);
router.get("/currentUser", currentUser_CTRL);
router.get("/file_list", file_list_CTRL);
router.get("/device_list", device_list_CTRL);

router.post("/delete_ota_files", delete_ota_files_CTRL);
router.post("/set_ota_status", set_ota_status_CTRL);

router.post("/send_custom_broker_request", send_custom_broker_request_CTRL);

module.exports = router;
