import { Student } from '../models/Student.js';
import { Job } from '../models/Job.js';
import { Application } from '../models/Application.js';
import { Department } from '../models/Department.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const getUniversityAnalytics = asyncHandler(async (req, res) => {
  const totalStudents = await Student.countDocuments();
  const placedStudents = await Student.countDocuments({ placementStatus: 'placed' });
  
  const totalJobs = await Job.countDocuments();
  const totalApplications = await Application.countDocuments();

  const placementRate = totalStudents > 0 ? (placedStudents / totalStudents) * 100 : 0;

  res.status(200).json(new ApiResponse(200, {
    totalStudents,
    placedStudents,
    placementRate,
    totalJobs,
    totalApplications
  }, 'University analytics fetched successfully'));
});
