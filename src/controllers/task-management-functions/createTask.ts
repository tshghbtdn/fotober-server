import { Request, Response } from 'express';
import { addTask } from '../../services'; 

export const createTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { description, tasktype, request } = req.body;

        if (!description || !tasktype || request === undefined) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }

        const result = await addTask(description, tasktype, request);

        res.status(201).json({
            message: 'Task created successfully',
            taskid: result.taskid,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
