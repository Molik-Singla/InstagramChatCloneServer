const express = require("express");
const router = express.Router();

const onlineOfflineController = require("../controller/onlineOfflineController");

router.route("/").get(onlineOfflineController.getAllOnlineOffline).delete(onlineOfflineController.deleteAllOnlineOffline);
router.route("/:userName").patch(onlineOfflineController.updateOnlineOffline).delete(onlineOfflineController.deleteOnlineOffline);
module.exports = router;
