import express from 'express';
import { verifyUser, registerUser } from '../controllers/authenticate-functions';

const app = express.Router();

app.post('/login', verifyUser);
app.post('/register', registerUser);

export default app;