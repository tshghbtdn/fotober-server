import express from 'express';
import { createTask } from '../controllers/task-management-functions';

const app = express.Router();

app.post('/createtask', createTask);

export default app;