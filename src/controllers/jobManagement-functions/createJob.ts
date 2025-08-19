import { Request, Response } from "express";
import { ser_createJob } from "../../services/jobs";

// Tạo job
export const con_createJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const role = req.headers["x-client-role"];

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const job = req.body;
    const createdJob = await ser_createJob(job);

    res.status(201).json(createdJob);
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
};
