import express from 'express';
import { signup, signin,profile } from '../Controllers/auth.contoller.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/profile' , verifyToken ,profile);

export default router;
