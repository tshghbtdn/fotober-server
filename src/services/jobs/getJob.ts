// File: src/controllers/jobManagement-functions/getJob.ts
import { client } from '../../config/db';

export async function ser_getJob(userId: string) {
  try {
    const result = await client.query(
      `SELECT job_code, customer_name, create_date, job_type, volume, sub_type, 
              input, instruction, deadline, output
       FROM jobs_request
       WHERE $1 = ANY(jobs_request.user_id)`,
      [userId]
    );

    return result.rows;
  } catch (error) {
    console.error('Error in ser_getJob:', error);
    throw error;
  }
}
