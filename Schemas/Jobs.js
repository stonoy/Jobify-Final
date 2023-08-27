import mongoose from "mongoose";
import { JOB_TYPE, JOB_STATUS } from "../utils/Job_Infos.js";
const { Schema } = mongoose;

const JobSchema = new Schema(
  {
    company: {
      type: String,
      required: [true, "Pls provide a company name"],
      maxLength: 20,
    },
    position: {
      type: String,
      required: [true, "Pls provide a position value"],
    },
    jobLocation: {
      type: String,
      required: [true, "Pls provide a location"],
      default: "my city",
    },
    status: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.PENDING,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.FULL_TIME,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
