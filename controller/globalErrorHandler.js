const AppError = require("./../utils/appError");

// duplicate field error
function handleDuplicateFieldErrorDB(error) {
    let value = JSON.stringify(error?.keyValue)?.replace("{", " ");
    value = value.replace("}", "");
    const message = `Duplicate Field value : ${value} , Please try another Value.`;
    return new AppError(message, 200);
}
// for validation error
function handleValidationErrorDb(error) {
    const errors = Object.values(error.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    return new AppError(message, 200);
}

function sendErrorDev(err, res) {
    res.status(err?.statusCode).json({
        status: err?.status,
        message: err?.message,
        error: err,
    });
}
function sendErrorProd(err, res) {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        res.status(err.statusCode).json({
            status: "fail",
            message: "Something went Wrong 😓😓",
        });
    }
}

// Global Error Handler
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 200;
    err.status = err.status || "error";

    if (process.env.NODE_ENV === "development") {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === "production") {
        let error = { ...err };

        if (err?.code === 11000) error = handleDuplicateFieldErrorDB(error);
        if (err?.name === "ValidationError") error = handleValidationErrorDb(error);

        sendErrorProd(error, res);
    }
};
