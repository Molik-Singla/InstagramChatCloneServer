const mongoose = require("mongoose");

const OnlineOffline = new mongoose.Schema({
    online: Array,
});

const OnlineOfflineModel = new mongoose.model("OnlineOffline", OnlineOffline);
module.exports = OnlineOfflineModel;
