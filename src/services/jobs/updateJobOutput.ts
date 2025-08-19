// File: src/services/jobs/updateJobOutput.ts
import { client } from '../../config/db';

export async function ser_updateJobOutput(
  user_id: string,
  job_code: string,
  output: string
): Promise<boolean> {
  try {
    const result = await client.query(
      `UPDATE jobs_request 
       SET output = $1
       WHERE job_code = $2 AND $3 = ANY(user_id)`,
      [output, job_code, user_id]
    );

    return result.rowCount !== null && result.rowCount > 0;
  } catch (error) {
    console.error('Error in ser_update_output:', error);
    return false;
  }
}
  