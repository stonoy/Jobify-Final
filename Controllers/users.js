import User from "../Schemas/users.js";
import Job from "../Schemas/Jobs.js";
import { StatusCodes } from "http-status-codes";
import createCustomApiError from "../Errors/customApiError.js";

import cloudinary from "cloudinary";
import { formatFile } from "../Middlewares/multerMiddleWare.js";

const register = async (req, res, next) => {
  const isFirstUser = (await User.countDocuments()) === 0;
  req.body.role = isFirstUser ? "admin" : "user";

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(
      createCustomApiError(
        "Pls fill all required details",
        StatusCodes.BAD_REQUEST
      )
    );
  }

  const user = await User.create(req.body);

  const token = user.createJwt();
  console.log(token);

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      createCustomApiError(
        "Pls fill all required details",
        StatusCodes.BAD_REQUEST
      )
    );
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(
      createCustomApiError(
        `No user found with ${email}`,
        StatusCodes.UNAUTHORIZED
      )
    );
  }

  const isCorrectPassword = await user.comparePassword(password);

  if (!isCorrectPassword) {
    return next(
      createCustomApiError(`Incorrect Password`, StatusCodes.UNAUTHORIZED)
    );
  }

  const token = user.createJwt();

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ msg: "user logged in!" });
};

const logout = async (req, res, next) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

const getCurrentUser = async (req, res, next) => {
  const { userId } = req.user;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    return next(
      createCustomApiError("No such user found", StatusCodes.NOT_FOUND)
    );
  }

  const userWithoutPassword = user.removePassword();

  // console.log(user);

  res.status(200).json({ userWithoutPassword });
};

const admin_special = async (req, res, next) => {
  const { role } = req.user;
  if (role !== "admin") {
    return next(
      createCustomApiError(
        "Admin special route not authorized",
        StatusCodes.UNAUTHORIZED
      )
    );
  }

  const numOfUsers = await User.countDocuments();
  const numOfJobs = await Job.countDocuments();

  res.status(200).json({ numOfUsers, numOfJobs });
};

const updateUser = async (req, res, next) => {
  // console.log(req.file);
  let newUser = { ...req.body };
  delete newUser.password;
  delete newUser.role;

  const {
    user: { userId },
    body: { name, email },
  } = req;

  if (!email || !name) {
    return next(
      createCustomApiError(
        "Pls fill all required details",
        StatusCodes.BAD_REQUEST
      )
    );
  }

  if (req.file) {
    const file = formatFile(req.file);

    const response = await cloudinary.v2.uploader.upload(file);

    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const userOldVersion = await User.findOneAndUpdate({ _id: userId }, newUser);

  if (req.file && userOldVersion.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(userOldVersion.avatarPublicId);
  }

  res.status(200).json({ msg: "user updated!" });
};

export { register, login, logout, getCurrentUser, admin_special, updateUser };
