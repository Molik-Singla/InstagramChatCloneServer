const mongoose = require("mongoose");

const socketRoomSchema = new mongoose.Schema({
    arrayOfRooms: [
        {
            roomName: String,
            oldMessages: [],
        },
    ],
});

const socketRoomModel = new mongoose.model("SocketRoom", socketRoomSchema);
module.exports = socketRoomModel;
