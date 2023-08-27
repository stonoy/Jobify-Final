import { StatusCodes } from "http-status-codes";

const Error_handler = (err, req, res, next) => {
  let customError = {
    msg: err.message || "Internal Server Error",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (err.name === "ValidationError") {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: err.message });
  }
  if (err.name === "CastError") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: `No job with id: ${err.value} found` });
  }
  if (err.code === 11000) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: `Email ${err.keyValue.email} already registered` });
  }

  res.status(customError.statusCode).json({ msg: customError.msg });
};

export default Error_handler;
