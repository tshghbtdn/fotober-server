// File: src/controllers/jobManagement-functions/getJob.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ser_getJob } from '../../services/jobs/getJob';

export async function con_getJob(req: Request, res: Response): Promise<void> {
  try {
    const { token } = req.body;

    if (!token) {
      res.status(400).json({ error: 'Missing token in request body' });
      return;
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = decoded.userId;
    console.log("check id:",userId)

    const jobs = await ser_getJob(userId);
    res.status(200).json(jobs);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(401).json({ error: 'Unauthorized or invalid token' });
  }
}
