const express = require("express");
const app = express();

const userRoute = require("./routes/userRoute");
const socketRoomRoute = require("./routes/socketRoomRoute");
const onlineOfflineRoute = require("./routes/onlineOfflineRoute");

const cors = require("cors");
const globalErrorHandler = require("./controller/globalErrorHandler");

app.use(express.json());
// app.use(express.static("./public"));

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PATCH", "DELETE"],
    })
);

app.use("/api/v1/user", userRoute);
app.use("/api/v1/socketRoom", socketRoomRoute);
app.use("/api/v1/onlineOffline", onlineOfflineRoute);

app.use(globalErrorHandler);
module.exports = app;

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-origin", "http://127.0.0.1:5500");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-with, Content-Type, Accept"
//     );
//     next();
// });
// app.use(
//     cors({
//         origin: "http://127.0.0.1:5500",
//         methods: ["GET", "POST", "PATCH", "DELETE"],
//     })
// );
