// File: src/routes/authRouter.ts
import express from 'express';
import * as AuthFuns from '../controllers/auth-functions';

const app = express.Router();

app.post('/login', AuthFuns.con_loginUser);
app.post('/register', AuthFuns.con_registerUser);
app.post('/logout', AuthFuns.con_logoutUser);

export default app;