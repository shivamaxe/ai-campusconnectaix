import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new ApiError(404, 'No document found with that ID'));
    }

    res.status(200).json(
      new ApiResponse(200, null, 'Document deleted successfully')
    );
  });

export const updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new ApiError(404, 'No document found with that ID'));
    }

    res.status(200).json(
      new ApiResponse(200, { data: doc }, 'Document updated successfully')
    );
  });

export const createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json(
      new ApiResponse(201, { data: doc }, 'Document created successfully')
    );
  });

export const getOne = (Model, popOptions) =>
  asyncHandler(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new ApiError(404, 'No document found with that ID'));
    }

    res.status(200).json(
      new ApiResponse(200, { data: doc }, 'Document fetched successfully')
    );
  });

export const getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    // Simple implementation - could be expanded with filtering/sorting/pagination
    const docs = await Model.find();

    res.status(200).json(
      new ApiResponse(200, { data: docs }, 'Documents fetched successfully')
    );
  });
