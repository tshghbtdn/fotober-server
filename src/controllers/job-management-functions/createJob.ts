import { Request, Response } from 'express';
import { addNewJob } from '../../services';

export const createJob = async (req: Request, res: Response): Promise<void> => {
    const { title, description, dueDate} = req.body;

    const managers: string[] = Array.isArray(req.body.managers) ? req.body.managers : [];
    const operators: string[] = Array.isArray(req.body.operators) ? req.body.operators : [];
    const monitors: string[] = Array.isArray(req.body.monitors) ? req.body.monitors : [];

    if (!managers.length || !operators.length || !monitors.length) {
        res.status(400).json({ message: 'Managers, operators, and monitors are required' });
        return;
    }

    try {
        // Thực hiện gọi hàm addNewJob trong services
        const job = await addNewJob(title, description, dueDate, managers, operators, monitors);

        // Trả về kết quả nếu job được tạo thành công
        res.status(201).json({
            message: 'Job created successfully',
            job,
        });
    } catch (error:any) {
        // Nếu có lỗi, trả về thông báo lỗi?
        res.status(500).json({message: 'Error creating job', error: error.message});
        console.error('Error creating job:', error); // Log lỗi để kiểm tra
    }
};