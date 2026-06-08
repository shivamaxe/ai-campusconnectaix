import { Router } from 'express';
import * as aiController from '../controllers/ai.controller.js';
import { protect } from '../middlewares/auth.js';

const router = Router();

// All AI routes require authentication
router.use(protect);

router.post('/career-coach', aiController.getCareerAdvice);
router.post('/resume-analyze', aiController.analyzeResume);
router.post('/placement-predict', aiController.predictPlacement);
router.post('/interview/start', aiController.startMockInterview);
router.post('/interview/evaluate', aiController.evaluateInterviewAnswer);
router.post('/skill-gap', aiController.analyzeSkillGap);
router.post('/job-match', aiController.getJobMatches);

export default router;
