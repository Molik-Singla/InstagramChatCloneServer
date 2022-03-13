const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: val => val.includes("@gmail.com"),
            message: "Invalid Email 💥💥",
        },
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password length must be greater tha 6 💥💥"],
    },
    name: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: val => !val.includes(" "),
            message: "Name does not Contain Whitepace, Join it with _ Underscore",
        },
    },
    friendList: {
        type: Array,
    },
});

const UserModel = new mongoose.model("User", userSchema);
module.exports = UserModel;
