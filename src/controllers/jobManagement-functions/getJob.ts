// File: src/controllers/jobManagement-functions/getJob.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ser_getJob, ser_getAllJob, ser_getJobByCSCode } from '../../services/jobs/getJob';
import { ser_getSalerCode } from '../../services/accounts';

export async function con_getJob(req: Request, res: Response): Promise<void> {
  try {
    const userId = res.locals.userId;
    const jobs = await ser_getJob(userId);
    
    res.status(200).json(jobs);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(401).json({ error: 'Unauthorized or invalid token' });
  }
}

export async function con_getJobByCSCode(req: Request, res: Response): Promise<void> {
  try {
    const cs_code = await ser_getSalerCode(res.locals.userId) ;
    if (!cs_code){
      res.status(401).json({ error: 'Unauthorized or invalid token1' });
      return;
    }

    const jobs = await ser_getJobByCSCode(cs_code);
    
    res.status(200).json(jobs);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(401).json({ error: 'Unauthorized or invalid token' });
  }
}

export async function con_getAllJob(req: Request, res: Response): Promise<void> {
  if (res.locals.role !== 'admin' && res.locals.role !== 'manager') {
      res.status(403).json({ error: 'Forbidden: Unauthorized' });
      return;
  }

  try {
    const jobs = await ser_getAllJob();
    res.status(200).json(jobs);
  } catch (err) {
    console.error('Error fetching all jobs:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
