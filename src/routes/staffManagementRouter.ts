import express from 'express';
import { getStaffListController } from '../controllers/user-management-functions'; // Đảm bảo đường dẫn đúng

const app = express.Router();

// Route: GET /staff/list
app.get('/list', getStaffListController);

export default app;
