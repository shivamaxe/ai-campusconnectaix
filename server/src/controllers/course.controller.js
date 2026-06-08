import { Course } from '../models/Course.js';
import * as factory from './handlerFactory.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const createCourse = factory.createOne(Course);
export const getCourse = factory.getOne(Course, { path: 'facultyId', select: 'firstName lastName employeeId' });
export const getAllCourses = factory.getAll(Course);
export const updateCourse = factory.updateOne(Course);
export const deleteCourse = factory.deleteOne(Course);

export const getDepartmentCourses = asyncHandler(async (req, res, next) => {
  const courses = await Course.find({ departmentId: req.params.departmentId });
  res.status(200).json(new ApiResponse(200, { data: courses }, 'Courses fetched successfully'));
});
