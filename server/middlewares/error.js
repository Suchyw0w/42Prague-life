const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = {
    ...err,
  };

  error.message = err.message;
  console.log(error.message);

  if (err.name === "CastError") {
    const message = "Zdroj nebyl nalezen";
    error = new ErrorResponse(message, 404);
  }

  if (err.code === 11000) {
    const message = "Byla zadaná hodnota, která již existuje";
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((errr) => {
      console.log(errr);
      return {
        field: errr.path,
        message: errr.message,
      };
    });

    error = new ErrorResponse(null, 400, message);
  }

  return res
    .status(error.statusCode)
    .json({
      success: false,
      error: error.messageWithField || error.message || "Server Error",
    });
};

module.exports = errorHandler;
