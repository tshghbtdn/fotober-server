import { Request, Response } from "express";
import { ser_createJob } from "../../services/jobs";

// Tạo job
export const con_createJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = req.body;
    const createdJob = await ser_createJob(job);

    res.status(201).json(createdJob);
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
};
