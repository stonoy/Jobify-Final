import { readFile } from "fs/promises";
import mongoose from "mongoose";
import {} from "dotenv/config.js";
import Job from "./Schemas/Jobs.js";
import User from "./Schemas/users.js";

try {
  await mongoose.connect(process.env.MONGO_URI);

  const testUser = await User.findOne({ email: "test@gmail.com" });
  let testJobs = JSON.parse(
    await readFile(new URL("./utils/MockData.json", import.meta.url))
  );
  testJobs = testJobs.map((job) => {
    return { ...job, createdBy: testUser._id };
  });
  await Job.deleteMany({ email: "test@gmail.com" });
  await Job.create(testJobs);
  console.log("success!");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
