import { Application } from '../models/Application.js';
import * as factory from './handlerFactory.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const getApplication = factory.getOne(Application);
export const getAllApplications = factory.getAll(Application);
export const deleteApplication = factory.deleteOne(Application);

export const updateApplicationStatus = asyncHandler(async (req, res, next) => {
  const application = await Application.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true }
  );

  res.status(200).json(new ApiResponse(200, { data: application }, 'Status updated successfully'));
});
