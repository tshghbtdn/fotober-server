import { client } from '../config/db';

export const addNewTask = async (
    description: string,
    operator: string,
    taskType: number,
    request: number
) => {
    try {
        const query = `
            INSERT INTO tasks (description, operator, taskType, request, done, progress)
            VALUES ($1, $2, $3, $4, 0, 0)
            RETURNING *;
        `;
        const values = [description, operator, taskType, request];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error('Failed to create task');
    } finally {
        await client.end();
    }
};
