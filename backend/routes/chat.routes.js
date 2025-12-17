// backend/routes/chat.routes.js
import express from 'express';
const router = express.Router();
import { chatWithAI } from '../controllers/chat.controllers.js';
import { isAuth } from '../middlewares/isAuth.js';

// Route definition
router.post('/', isAuth, chatWithAI);

export default router;
 