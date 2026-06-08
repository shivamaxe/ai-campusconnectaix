import { Router } from 'express';
import * as analyticsController from '../controllers/analytics.controller.js';
import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/authorize.js';
import { PERMISSIONS } from '../config/permissions.js';

const router = Router();

router.use(protect);

router.get(
  '/university',
  authorize(PERMISSIONS.ANALYTICS_VIEW),
  analyticsController.getUniversityAnalytics
);

export default router;
