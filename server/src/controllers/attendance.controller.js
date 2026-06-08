import { Attendance } from '../models/Attendance.js';
import * as factory from './handlerFactory.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const markAttendance = factory.createOne(Attendance);
export const getAttendanceRecord = factory.getOne(Attendance);
export const updateAttendance = factory.updateOne(Attendance);
export const deleteAttendance = factory.deleteOne(Attendance);

export const getStudentAttendance = asyncHandler(async (req, res, next) => {
  const records = await Attendance.find({ studentId: req.params.studentId })
    .populate('courseId', 'name code')
    .sort('-date');
    
  res.status(200).json(new ApiResponse(200, { data: records }, 'Attendance fetched successfully'));
});
