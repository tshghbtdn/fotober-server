// src/controllers/task-management-functions.ts

import { Request, Response } from 'express';
import { client } from '../../config/db';  // Import client đã được cấu hình kết nối
import { promises } from 'dns';

// Hàm cập nhật operator cho task
export const updateTaskOP = async (req: Request, res: Response): Promise<void> => {
    const { taskid } = req.params; // taskid từ params trong URL
    const { operator } = req.body; // operator từ body

    // Kiểm tra xem operator có được cung cấp hay không
    if (!operator) {
        res.status(400).json({ message: 'Operator is required.' });
    }

    try {
        // Cập nhật operator cho task trong bảng tasks
        const query = `
            UPDATE tasks 
            SET operator = $1 
            WHERE taskid = $2
            RETURNING *;
        `;
        const values = [operator, taskid];

        // Thực thi câu lệnh SQL
        const result = await client.query(query, values);

        if (result.rows.length === 0) {
            // Nếu không tìm thấy task, trả về lỗi 404
            res.status(404).json({ message: 'Task not found' });
            return;
        }

        // Trả về task đã được cập nhật
        const updatedTask = result.rows[0];
        res.status(200).json({
        message: 'Task updated successfully',
        task: updatedTask
        });
        return;
    } catch (error) {
        console.error('Error updating task operator:', error);
        res.status(500).json({ message: 'Failed to update task operator' });
        return;
    }
};
