import { StatusCodes } from "http-status-codes";
import createCustomApiError from "../Errors/customApiError.js";
import Jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  // console.log(req.cookies?.token);
  const token = req.cookies?.token;
  if (!token) {
    return next(
      createCustomApiError("pls provide a valid token"),
      StatusCodes.UNAUTHORIZED
    );
  }
  try {
    const payload = Jwt.verify(token, process.env.JWT_SECRET);
    req.user = { ...payload };
    next();
  } catch (error) {
    next(createCustomApiError("Invalid Token", StatusCodes.UNAUTHORIZED));
  }
};

export default auth;
