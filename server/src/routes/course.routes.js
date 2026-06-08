import { Router } from 'express';
import * as courseController from '../controllers/course.controller.js';
import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/authorize.js';
import { PERMISSIONS } from '../config/permissions.js';

const router = Router();

router.use(protect);

router.get('/department/:departmentId', courseController.getDepartmentCourses);

router
  .route('/')
  .get(courseController.getAllCourses)
  .post(
    authorize(PERMISSIONS.COURSE_MANAGE),
    courseController.createCourse
  );

router
  .route('/:id')
  .get(courseController.getCourse)
  .put(
    authorize(PERMISSIONS.COURSE_MANAGE),
    courseController.updateCourse
  )
  .delete(
    authorize(PERMISSIONS.COURSE_MANAGE),
    courseController.deleteCourse
  );

export default router;
