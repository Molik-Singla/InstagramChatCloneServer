const UserModel = require("./../model/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await UserModel.find().select("-password");

    res.status(200).json({
        status: "success",
        length: users.length,
        data: [users],
    });
});
exports.signup = catchAsync(async (req, res, next) => {
    let user = await UserModel.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            name: user.name,
            id: user["_id"],
        },
    });
});
exports.login = catchAsync(async (req, res, next) => {
    let user = await UserModel.findOne({ name: req.body.name }).exec();

    if (!user) {
        return res.json({
            status: "fail",
            data: "Account Not Exist !",
        });
    } else if (user.email !== req.body.email || user.password !== req.body.password) {
        return res.json({
            status: "fail",
            data: "Email or Password does't match !",
        });
    }
    res.json({
        status: "success",
        data: {
            name: user.name,
            id: user["_id"],
            friendList: user.friendList,
        },
    });
});
exports.getUserByName = catchAsync(async (req, res, next) => {
    if (req.params.friendList === "true") return next();
    let user = await UserModel.findOne({ name: req.params.name }).select("-password");

    if (!user) return next(new AppError("No user Found", 200));
    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    });
});
exports.updateUserByName = catchAsync(async (req, res, next) => {
    if (req.body.friendList) return next();

    let user = await UserModel.findOne({ name: req.params.name }).select("-password");

    if (!user) return next(new AppError("No user Found", 200));

    user = await UserModel.findByIdAndUpdate(user._id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: "success",
        data: user,
    });
});
exports.updateFriendList = catchAsync(async (req, res, next) => {
    let user = await UserModel.findOne({ name: req.params.name }).select("-password");

    if (!user) return next(new AppError("No user Found", 200));

    // If already a friend
    if (user.friendList.includes(req.body.friendList)) {
        return res.status(200).json({
            status: "fail",
            data: "Already a Friends",
        });
    }

    // For our own name
    if (user.name === req.body.friendList) {
        return res.status(200).json({
            status: "fail",
            data: "Cannot be our own Friend",
        });
    }
    user.friendList.push(req.body.friendList);
    await user.save();
    res.status(200).json({
        status: "success",
        data: user,
    });
});
exports.getAllFriends = catchAsync(async (req, res, next) => {
    let user = await UserModel.findOne({ name: req.params.name }).exec();

    if (!user) return next(new AppError("No user Found", 200));
    res.status(200).json({
        status: "success",
        data: user.friendList,
    });
});
