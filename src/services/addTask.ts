import { v4 as uuidv4 } from 'uuid';
import {client} from '../config/db'; // Giả sử bạn dùng pg/pool từ PostgreSQL

export const addTask = async (description: string, tasktype: number, request: number) => {
    const taskid = uuidv4();
    const operator = null; // tạm để trống
    const done = 0;
    const progress = 0;

    await client.query(
        'INSERT INTO tasks (taskid, description, operator, tasktype, request, done, progress) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [taskid, description, operator, tasktype, request, done, progress]
    );

    return { taskid };
};
