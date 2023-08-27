import express from "express";
import {
  getAllJobs,
  createJob,
  getSingleJob,
  updateJob,
  deleteJob,
  jobStats,
} from "../Controllers/Jobs.js";
import testUser from "../Middlewares/testUser.js";

const router = express.Router();

router.route("/").get(getAllJobs).post(testUser, createJob);
router.get("/stats", jobStats);
router
  .route("/:id")
  .get(getSingleJob)
  .patch(testUser, updateJob)
  .delete(testUser, deleteJob);

export default router;
