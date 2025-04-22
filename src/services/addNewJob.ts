// src/services/job-management-services/addNewJob.ts
import { client } from '../config/db';

export const addNewJob = async (
    title: string,
    description: string,
    dueDate: string,
    managers: string[], 
    operators: string[], 
    monitors: string[]
) => {
    try {
        const query = `
        INSERT INTO jobs (title, description, due_date, managers, operators, monitors)
        VALUES ($1, $2, $3,$4, $5, $6) RETURNING *;
        `;
        const values = [title, description, dueDate, managers, operators, monitors];
        const result = await client.query(query, values);

        return result.rows[0];
    } catch (error) {
        throw new Error('Failed to create job');
    } finally {
        await client.end();
    }
};
