const OnlineOfflineModel = require("../model/onlineOfflineModel");
const catchAsync = require("./../utils/catchAsync");

const DataBaseCollectionId = "622615b9b8d16cc3af36d3b1";

exports.getAllOnlineOffline = catchAsync(async (req, res) => {
    let allOnline = await OnlineOfflineModel.findById(DataBaseCollectionId);

    let answer = [...allOnline.online];
    if (allOnline.online.length === 0) answer = null;
    res.json({
        status: "success",
        data: answer,
    });
});
exports.updateOnlineOffline = catchAsync(async (req, res) => {
    let allOnline = await OnlineOfflineModel.findById(DataBaseCollectionId);

    let arr = [...allOnline.online];
    if (!arr.includes(req.params.userName)) arr.push(req.params.userName);

    await OnlineOfflineModel.findOneAndUpdate(DataBaseCollectionId, {
        online: [...arr],
    });

    res.json({
        status: "success",
    });
});
exports.deleteAllOnlineOffline = catchAsync(async (req, res) => {
    await OnlineOfflineModel.findOneAndUpdate(DataBaseCollectionId, {
        online: [],
    });

    res.json({
        status: "success",
    });
});
exports.deleteOnlineOffline = catchAsync(async (req, res) => {
    let allOnline = await OnlineOfflineModel.findById(DataBaseCollectionId);

    let arr = [...allOnline.online];

    if (arr.includes(req.params.userName)) {
        arr = arr.filter(element => element !== req.params.userName);
    }

    await OnlineOfflineModel.findOneAndUpdate(DataBaseCollectionId, {
        online: [...arr],
    });

    res.json({
        status: "success",
        data: arr,
    });
});
