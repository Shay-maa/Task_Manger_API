const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-error");

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
    console.log("bad req")
  }
}

module.exports = UnauthenticatedError;
