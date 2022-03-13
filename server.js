const app = require("./app");

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});

const PORT = process.env.PORT || 8000;

mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB SuccessFull Connected 🎉🎉🎉🎉");
    })
    .catch(err => {
        console.log("Error Why" + err);
    });

// socket io ---------------------------------------------------

io.on("connection", socket => {
    socket.broadcast.emit("updateStatusToOthers", socket.id);

    socket.on("join", room => {
        socket.join(room);
    });
    socket.on("send-message", (room, message) => {
        socket.to(room).emit("recieve-message", message);
        // io.sockets.adapter.rooms.get(room)?.size
    });
    socket.on("disconnect", () => {
        socket.emit("cutOffOnlineConnection", socket.id);
        socket.broadcast.emit("restart", socket.id);
    });
});

server.listen(PORT, () => {
    console.log("Socket Server listen on Port : 8000 🎉🎉🎉🎉");
});
