// File: src/controllers/jobManagement-function/con_countTodayJob.ts
import { Request, Response } from "express";
import { ser_countTodayJob } from "../../services/jobs"

export async function con_countTodayJob(req: Request, res: Response) {
  try {
    const count = await ser_countTodayJob();
    res.json({ count });
  } catch (error) {
    console.error("Error in con_countTodayJob:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
