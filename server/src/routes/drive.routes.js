import { Router } from 'express';
import * as driveController from '../controllers/drive.controller.js';
import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/authorize.js';
import { PERMISSIONS } from '../config/permissions.js';

const router = Router();

router.use(protect);

router
  .route('/')
  .get(driveController.getAllDrives)
  .post(
    authorize(PERMISSIONS.PLACEMENT_MANAGE),
    driveController.createDrive
  );

router
  .route('/:id')
  .get(driveController.getDrive)
  .put(
    authorize(PERMISSIONS.PLACEMENT_MANAGE),
    driveController.updateDrive
  )
  .delete(
    authorize(PERMISSIONS.PLACEMENT_MANAGE),
    driveController.deleteDrive
  );

export default router;
