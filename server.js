import "express-async-errors";
import express from "express";
const app = express();
import morgan from "morgan";
import cors from "cors";
import {} from "dotenv/config.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import JobsRoutes from "./Routes/Jobs.js";
import UserRoutes from "./Routes/users.js";
import auth from "./Middlewares/auth.js";
import Error_handler from "./Middlewares/error_handler.js";
import Not_Found from "./Middlewares/Not_Found.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

// middlewares
app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Api Routes
app.use("/api/v1/jobs", auth, JobsRoutes);
app.use("/api/v1/user", UserRoutes);

// React App
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

// error handler

app.use(Not_Found);
app.use(Error_handler);

const port = 5000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
