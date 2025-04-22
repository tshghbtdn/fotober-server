import { Request, Response } from 'express';
import { addNewTask } from '../../services'; // Gọi hàm từ services

export const createTask = async (req: Request, res: Response): Promise<void> => {
    const { description, operator, taskType, request } = req.body;

    // Kiểm tra dữ liệu bắt buộc
    if (!description || !operator || taskType === undefined || request === undefined) {
        res.status(400).json({
            message: 'Fields "description", "operator", "taskType", and "request" are required.',
        });
        return;
    }

    try {
        // Gọi service để thêm task
        const task = await addNewTask(description, operator, taskType, request);

        // Trả về kết quả nếu tạo task thành công
        res.status(201).json({
            message: 'Task created successfully',
            task,
        });
    } catch (error: any) {
        console.error('Error creating task:', error);
        res.status(500).json({
            message: 'Error creating task',
            error: error.message,
        });
    }
};
