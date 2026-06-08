import { Router } from 'express';
import * as assignmentController from '../controllers/assignment.controller.js';
import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/authorize.js';
import { PERMISSIONS } from '../config/permissions.js';

const router = Router();

router.use(protect);

router
  .route('/')
  .get(assignmentController.getAllAssignments)
  .post(
    authorize(PERMISSIONS.ASSIGNMENT_MANAGE),
    assignmentController.createAssignment
  );

router
  .route('/:id')
  .get(assignmentController.getAssignment)
  .put(
    authorize(PERMISSIONS.ASSIGNMENT_MANAGE),
    assignmentController.updateAssignment
  )
  .delete(
    authorize(PERMISSIONS.ASSIGNMENT_MANAGE),
    assignmentController.deleteAssignment
  );

export default router;
