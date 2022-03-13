const express = require("express");
const router = express.Router();

const socketRoomController = require("../controller/socketRoomController");

router.route("/").patch(socketRoomController.updateRoom);
router.route("/:roomName").get(socketRoomController.getOldMessages);
module.exports = router;
