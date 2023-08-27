import { StatusCodes } from "http-status-codes";
import createCustomApiError from "../Errors/customApiError.js";

const testUser = (req, res, next) => {
  if (req.user.userId === "64e8b151285d6a7a58a828c2") {
    return next(
      createCustomApiError("Test User Not Allowed", StatusCodes.FORBIDDEN)
    );
  }
  next();
};

export default testUser;
