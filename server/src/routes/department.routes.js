import { Router } from 'express';
import * as departmentController from '../controllers/department.controller.js';
import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/authorize.js';
import { PERMISSIONS } from '../config/permissions.js';

const router = Router();

// Protect all routes
router.use(protect);

router
  .route('/')
  .get(departmentController.getAllDepartments)
  .post(
    authorize(PERMISSIONS.DEPARTMENT_MANAGE),
    departmentController.createDepartment
  );

router
  .route('/:id')
  .get(departmentController.getDepartment)
  .put(
    authorize(PERMISSIONS.DEPARTMENT_MANAGE),
    departmentController.updateDepartment
  )
  .delete(
    authorize(PERMISSIONS.DEPARTMENT_MANAGE),
    departmentController.deleteDepartment
  );

export default router;
