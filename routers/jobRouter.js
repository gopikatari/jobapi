const express = require('express');
const {
  getAllJobs,
  getSingleJob,
  updateJob,
  createJob,
  deleteJob,
} = require('../controllers/jobsController');
const { jobCreateValidate } = require('../middlewares/validationMiddleware');

const jobRouter = express.Router();

jobRouter.route('/').get(getAllJobs).post(jobCreateValidate, createJob);
jobRouter
  .route('/:jobId')
  .get(getSingleJob)
  .put(jobCreateValidate, updateJob)
  .delete(deleteJob);

module.exports = jobRouter;
