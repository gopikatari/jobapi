const { StatusCodes } = require('http-status-codes');
const errorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Internal Server Error!',
  };
  if (err instanceof CustomErrorAPI) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  if (err.name === 'ValidationError') {
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(',');
  }
  if (err.name === 'CastError') {
    customError.message = `No item found for the id :${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }
  if (err && err.code === 11000) {
    customError.message = `Duplicate value for the field :: ${
      Object.keys(err.keyValue)[0]
    }`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  return res
    .status(customError.statusCode)
    .json({ message: customError.message });
};

class CustomErrorAPI extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

class UnathenticationError extends CustomErrorAPI {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

class BadRequestError extends CustomErrorAPI {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

class NotFoundError extends CustomErrorAPI {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

const createCustomError = (message, statusCode) => {
  return new CustomErrorAPI(message, statusCode);
};
module.exports = {
  errorHandler,
  createCustomError,
  CustomErrorAPI,
  UnathenticationError,
  BadRequestError,
  NotFoundError,
};
