// File: src/routes/authRouter.ts
import express from 'express';
import * as AuthFuns from '../controllers/auth-functions';

const router = express.Router();

router.post('/login', AuthFuns.con_loginUser);
router.post('/register', AuthFuns.con_registerUser);
router.post('/logout', AuthFuns.con_logoutUser);

export default router;