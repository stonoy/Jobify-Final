import express from "express";
import {
  register,
  login,
  logout,
  getCurrentUser,
  admin_special,
  updateUser,
} from "../Controllers/users.js";
import auth from "../Middlewares/auth.js";
import upload from "../Middlewares/multerMiddleWare.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/getcurrentuser", auth, getCurrentUser);
router.get("/admin-special", auth, admin_special);
router.patch("/updateuser", auth, upload.single("avatar"), updateUser);

export default router;
