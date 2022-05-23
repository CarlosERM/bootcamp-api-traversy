const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (error, req, res, next) => {
  let errorr = { ...error };
  errorr.message = error.message;

  //log to console for dev.
  console.log(error.stack.red);

  //Mongoose bad ObjectId
  if (error.name === "CastError") {
    const message = `Resource not found with id of ${error.value}`;
    errorr = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (error.code === 11000) {
    const message = "Duplicate field value entered";
    errorr = new ErrorResponse(message, 400);
  }
  // Mongoose validation error
  if (error.name === "ValidationError") {
    const message = Object.values(error.errors).map((val) => val.message);
    errorr = new ErrorResponse(message, 400);
    console.log(message);
  }
  res
    .status(errorr.statusCode || 500)
    .json({ succes: false, error: errorr.message || "Server Error" });
};

module.exports = errorHandler;
