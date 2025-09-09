// File: src/app.ts
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

// Cấu hình CORS cho phép các origin từ frontend khác nhau
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(',') || [], // IP máy frontend
    credentials: true
  }));

app.use(express.json());
app.use(cookieParser());

// Các router khác
import authRouter from './routes/authRouter';
import jobRouter from './routes/jobRouter';
import { mid_authenticateUser } from './middlewares';

//Mounding routers
app.use('/auth', mid_authenticateUser, authRouter);
app.use('/job', mid_authenticateUser, jobRouter);

export default app;
