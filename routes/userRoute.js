const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");

router.route("/").get(userController.getAllUsers);

router.route("/signup").post(userController.signup);

router.route("/login").post(userController.login);

router
    .route("/:name/:friendList?")
    .get(userController.getUserByName, userController.getAllFriends)
    .patch(userController.updateUserByName, userController.updateFriendList);

module.exports = router;
