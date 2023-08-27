import Job from "../Schemas/Jobs.js";
import { StatusCodes } from "http-status-codes";
import createCustomApiError from "../Errors/customApiError.js";
import mongoose from "mongoose";
import day from "dayjs";

const getAllJobs = async (req, res, next) => {
  const { search, jobLocation, status, jobType, sort } = req.query;
  const { userId } = req.user;

  let queryObject = { createdBy: userId };

  if (search) {
    queryObject.$or = [
      { company: { $regex: search, $options: "i" } },
      { position: { $regex: search, $options: "i" } },
    ];
  }

  if (jobLocation) {
    queryObject.jobLocation = { $regex: jobLocation, $options: "i" };
  }
  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  const sortOptions = {
    latest: "-createdAt",
    oldest: "createdAt",
    "a-z": "-company",
    "z-a": "company",
  };

  const sortType = sortOptions[sort] || sortOptions.latest;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const jobs = await Job.find(queryObject)
    .sort(sortType)
    .limit(limit)
    .skip(skip);

  const numOfJobs = await Job.countDocuments(queryObject);

  const numOfPages = Math.ceil(numOfJobs / limit);

  res.status(StatusCodes.OK).json({ jobs, numOfJobs, numOfPages, page });
};

const createJob = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return next(
      createCustomApiError(
        "Provide company and position value",
        StatusCodes.BAD_REQUEST
      )
    );
  }

  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ msg: "job created", job });
};

const getSingleJob = async (req, res, next) => {
  const { userId } = req.user;
  const { id: jobId } = req.params;

  const job = await Job.findOne({ _id: jobId, createdBy: userId });

  if (!job) {
    return next(
      createCustomApiError(`No job Id ${jobId} found`, StatusCodes.BAD_REQUEST)
    );
  }

  res.status(StatusCodes.OK).json({ job });
};

const updateJob = async (req, res, next) => {
  const { userId } = req.user;
  const { id: jobId } = req.params;
  const { company, position } = req.body;

  if (!company || !position) {
    return next(
      createCustomApiError(
        "Provide company and position value",
        StatusCodes.BAD_REQUEST
      )
    );
  }

  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!job) {
    return next(
      createCustomApiError(`No job Id ${jobId} found`, StatusCodes.BAD_REQUEST)
    );
  }

  res.status(StatusCodes.OK).json({ msg: "job updated!", job });
};

const deleteJob = async (req, res, next) => {
  const { userId } = req.user;
  const { id: jobId } = req.params;

  const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });

  if (!job) {
    return next(
      createCustomApiError(`No job Id ${jobId} found`, StatusCodes.BAD_REQUEST)
    );
  }

  res.status(StatusCodes.OK).json({ msg: "job deleted!", job });
};

const jobStats = async (req, res, next) => {
  let totalJobsByStatus = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  totalJobsByStatus = totalJobsByStatus.reduce((total, item) => {
    const { _id, count } = item;
    total[_id] = count;
    return total;
  }, {});

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 5 },
  ]);

  monthlyApplications = monthlyApplications.map((data) => {
    const {
      _id: { year, month },
      count,
    } = data;

    const date = day()
      .month(month - 1)
      .year(year)
      .format("MMM YY");
    return { date, count };
  });

  res.status(StatusCodes.OK).json({ totalJobsByStatus, monthlyApplications });
};

export { getAllJobs, createJob, getSingleJob, updateJob, deleteJob, jobStats };
