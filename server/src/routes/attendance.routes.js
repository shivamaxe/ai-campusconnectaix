import { Router } from 'express';
import * as attendanceController from '../controllers/attendance.controller.js';
import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/authorize.js';
import { PERMISSIONS } from '../config/permissions.js';

const router = Router();

router.use(protect);

router.get('/student/:studentId', attendanceController.getStudentAttendance);

router
  .route('/')
  .post(
    authorize(PERMISSIONS.ATTENDANCE_MARK),
    attendanceController.markAttendance
  );

router
  .route('/:id')
  .get(attendanceController.getAttendanceRecord)
  .put(
    authorize(PERMISSIONS.ATTENDANCE_MARK),
    attendanceController.updateAttendance
  )
  .delete(
    authorize(PERMISSIONS.ATTENDANCE_MARK),
    attendanceController.deleteAttendance
  );

export default router;
