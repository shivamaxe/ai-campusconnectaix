import { Job } from '../models/Job.js';
import * as factory from './handlerFactory.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Application } from '../models/Application.js';

export const createJob = factory.createOne(Job);
export const getJob = factory.getOne(Job, { path: 'companyId', select: 'name logo industry tier' });
export const getAllJobs = factory.getAll(Job);
export const updateJob = factory.updateOne(Job);
export const deleteJob = factory.deleteOne(Job);

export const applyForJob = asyncHandler(async (req, res, next) => {
  // Simple apply logic
  const application = await Application.create({
    studentId: req.user._id,
    jobId: req.params.id,
    resumeId: req.body.resumeId,
  });

  // Increment total applications
  await Job.findByIdAndUpdate(req.params.id, { $inc: { totalApplications: 1 } });

  res.status(201).json(new ApiResponse(201, { data: application }, 'Applied successfully'));
});
