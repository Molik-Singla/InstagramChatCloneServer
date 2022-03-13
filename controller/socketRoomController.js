const SocketRoomModel = require("./../model/socketRoomModel");
const catchAsync = require("./../utils/catchAsync");

const DataBaseCollection = "622594a7f9acbde36e126906";

exports.updateRoom = catchAsync(async (req, res) => {
    let outerAllRooms = await SocketRoomModel.findById(DataBaseCollection).exec();

    let arr = outerAllRooms.arrayOfRooms;
    let flag = 1;
    let answerRoom;

    for (let singleObj of arr) {
        if (
            singleObj.roomName === req.body.roomName ||
            (singleObj.roomName.includes(req.body.roomName.split("-")[0]) && singleObj.roomName.includes(req.body.roomName.split("-")[1]))
        ) {
            answerRoom = singleObj.roomName;
            singleObj.oldMessages = [...singleObj.oldMessages, ...(req.body.oldMessages ?? [])];
            flag = 0;
            break;
        }
    }
    if (flag) {
        arr.push(req.body);
        answerRoom = req.body.roomName;
    }

    await outerAllRooms.save();

    res.json({
        status: "success",
        data: answerRoom,
    });
});

exports.getOldMessages = catchAsync(async (req, res) => {
    let outerAllRooms = await SocketRoomModel.findOne();

    let answer;
    for (let singleObj of Array.from(outerAllRooms.arrayOfRooms)) {
        if (
            singleObj.roomName === req.params.roomName ||
            (singleObj.roomName.includes(req.params.roomName.split("-")[0]) &&
                singleObj.roomName.includes(req.params.roomName.split("-")[1]))
        ) {
            answer = singleObj.oldMessages;
            break;
        }
    }

    answer = answer ?? null;

    res.json({
        status: "success",
        data: answer,
    });
});
