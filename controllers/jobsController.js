const { StatusCodes } = require('http-status-codes');
const { CustomErrorAPI } = require('../middlewares/errorHandler');
const Job = require('../models/Job');

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort(
    '-createdAt'
  );
  res.status(200).json({
    nbHits: jobs.length,
    jobs,
  });
};

const createJob = async (req, res) => {
  const jobInput = req.body;

  jobInput.createdBy = req.user.userId;
  console.log(req.user.userId);
  const job = await Job.create(jobInput);

  if (!job)
    throw new CustomErrorAPI(
      'Failed to create the job',
      StatusCodes.INTERNAL_SERVER_ERROR
    );

  res.status(StatusCodes.CREATED).json(job);
};

const getSingleJob = async (req, res) => {
  const { jobId } = req.params;

  const job = await Job.findOne({
    _id: jobId,
    createdBy: req.user.userId,
  });
  if (!job)
    throw new CustomErrorAPI(
      'No Job found for the given id',
      StatusCodes.NOT_FOUND
    );
  res.status(200).json(job);
};

const updateJob = async (req, res) => {
  const {
    body: { company, position, status },
    params: { jobId },
    user: { userId },
  } = req;

  // const updateJob = await Job.updateOne(
  //   { _id: jobId, createdBy: userId },
  //   { ...req.body },
  //   { new: true, runValidators: true }
  // );

  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    { ...req.body },
    { new: true, runValidators: true }
  );
  res.status(200).json(job);
};

const deleteJob = async (req, res) => {
  const {
    params: { jobId },
    user: { userId },
  } = req;

  const delJob = await Job.findOneAndDelete({
    _id: jobId,
    createdBy: userId,
  });

  console.log(delJob);
  if (!delJob) {
    throw new CustomErrorAPI(
      'Failed to delete the Job',
      StatusCodes.EXPECTATION_FAILED
    );
  }
  res.status(StatusCodes.OK).json(deleteJob);
};

module.exports = {
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
  createJob,
};
