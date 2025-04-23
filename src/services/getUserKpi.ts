import { client } from '../config/db'; // giả định file db export client

type KPIData = {
  month_year: string;
  job_received: number;
  job_done: number;
};

export async function getUserKPI(staffId: string): Promise<KPIData[]> {
  const query = `
    SELECT 
      month_year,
      SUM(job_received) AS job_received,
      SUM(job_done) AS job_done
    FROM (
      SELECT month_year, job_received, job_done FROM kpi1 WHERE id = $1
      UNION ALL
      SELECT month_year, job_received, job_done FROM kpi2 WHERE id = $1
      UNION ALL
      SELECT month_year, job_received, job_done FROM kpi3 WHERE id = $1
    ) AS combined
    GROUP BY month_year
    ORDER BY month_year;
  `;

  const result = await client.query(query, [staffId]);

  return result.rows.map((row: { month_year: any; job_received: string; job_done: string; }) => ({
    month_year: row.month_year,
    job_received: parseInt(row.job_received),
    job_done: parseInt(row.job_done)
  }));
}
