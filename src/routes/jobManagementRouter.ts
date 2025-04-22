import express from 'express';
import { createJob } from '../controllers/job-management-functions';

const app = express.Router();

app.post('/create', createJob);

export default app;