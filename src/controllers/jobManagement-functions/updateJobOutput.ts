import { Request, Response } from 'express';
import { ser_updateJobOutput } from '../../services/jobs/updateJobOutput';

export const con_updateJobOutput = async (req: Request, res: Response): Promise<void> => {
  try {
    const { job_code, output } = req.body;
    const user_id = res.locals.userId;

    if (!job_code || !output) {
      res.status(400).json({ message: 'Missing job_code or output' });
      return;
    }

    const success = await ser_updateJobOutput(user_id, job_code, output);

    if (!success) {
      res.status(404).json({ message: 'Job not found or not authorized' });
      return;
    }

    res.status(200).json({ message: 'Output updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};
