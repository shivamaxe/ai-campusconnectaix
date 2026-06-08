import { Router } from 'express';
import * as chatController from '../controllers/chat.controller.js';
import { protect } from '../middlewares/auth.js';

const router = Router();

router.use(protect);

router.get('/contacts', chatController.getChatContacts);
router.get('/:otherUserId', chatController.getConversation);

export default router;
