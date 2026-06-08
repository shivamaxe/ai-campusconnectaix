import { Router } from 'express';
import * as applicationController from '../controllers/application.controller.js';
import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/authorize.js';
import { PERMISSIONS } from '../config/permissions.js';

const router = Router();

router.use(protect);

router
  .route('/')
  .get(applicationController.getAllApplications);

router.put(
  '/:id/status', 
  authorize(PERMISSIONS.APPLICATION_REVIEW), 
  applicationController.updateApplicationStatus
);

router
  .route('/:id')
  .get(applicationController.getApplication)
  .delete(
    authorize(PERMISSIONS.APPLICATION_REVIEW),
    applicationController.deleteApplication
  );

export default router;
