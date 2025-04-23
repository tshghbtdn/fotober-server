// src/routes/taskRoutes.ts

import express, { Request, Response } from 'express';
import { createTask, getAllTaskController, updateTaskOP } from '../controllers/task-management-functions'; // Import hàm update operator
import { client } from '../config/db'; // Import client đã được cấu hình kết nối DB

const app = express.Router();

// Route để cập nhật operator cho task
app.post('/update/:taskid', updateTaskOP);

// Route để tạo task
app.post('/create', createTask);

// Route để lấy tất cả task
app.get('/list', getAllTaskController);

export default app;
