import express from 'express';
import { signup, signin,profile, verify } from '../Controllers/auth.contoller.js';
import { bookmarks , bookmarksadd } from '../Controllers/bookmark.contoller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { sendOtp }  from '../utils/resend.js';



const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/profile' , verifyToken ,profile);
router.get('/bookmarks' , verifyToken , bookmarks )
router.post('/bookmarks' , verifyToken , bookmarksadd )
router.post('/email' , sendOtp)
router.post('/verify' , verify)
export default router;
