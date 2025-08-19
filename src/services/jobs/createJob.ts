// File: src/services/jobs/ser_createJob.ts
import { client } from "../../config/db";

export const ser_createJob = async (job: any) => {
  try {
    const result = await client.query(
      `
      INSERT INTO jobs_request
        (job_code, customer_name, create_date, job_type, volume, sub_type, input, output, instruction, deadline, user_id, cs_code, new_job_check)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *;
    `,
      [
        job.job_code,
        job.customer_name,
        job.create_date,
        job.job_type,
        job.volume,
        job.sub_type,
        job.input,
        job.output,
        job.instruction,
        job.deadline || null,
        job.user_id, // <-- truyền mảng trực tiếp, ví dụ [] hoặc [1,2]
        job.cs_code,
        job.new_job_check,
      ]
    );

    return result.rows[0];
  } catch (err: any) {
    if (err.code === "23505") {
      throw new Error(`Duplicate key error: ${err.detail || "Duplicate value"}`);
    }
    throw err;
  }
};
