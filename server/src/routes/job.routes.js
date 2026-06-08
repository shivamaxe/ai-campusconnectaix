import { Router } from 'express';
import * as jobController from '../controllers/job.controller.js';
import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/authorize.js';
import { PERMISSIONS } from '../config/permissions.js';

const router = Router();

router.use(protect);

router.post('/:id/apply', jobController.applyForJob);

router
  .route('/')
  .get(jobController.getAllJobs)
  .post(
    authorize(PERMISSIONS.JOB_MANAGE),
    jobController.createJob
  );

router
  .route('/:id')
  .get(jobController.getJob)
  .put(
    authorize(PERMISSIONS.JOB_MANAGE),
    jobController.updateJob
  )
  .delete(
    authorize(PERMISSIONS.JOB_MANAGE),
    jobController.deleteJob
  );

export default router;
