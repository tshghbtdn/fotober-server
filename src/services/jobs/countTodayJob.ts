// File: src/controllers/jobManagement-functions/ser_countTodayJob.ts
import { client } from '../../config/db';

export async function ser_countTodayJob() {
  try {
    const today = new Date().toISOString().split('T')[0];

    const result = await client.query(
      `SELECT COUNT(*) as count
       FROM jobs_request
       WHERE (create_date::date)::text = $1`,
      [today]
    );

    return Number(result.rows[0].count);
  } catch (error) {
    console.error('Error in ser_getJobCountToday:', error);
    throw error;
  }
}
