import { Request, Response } from 'express';
import { ser_getEmployees } from '../../services/manager/getEmployees';

export async function con_getEmployees(req: Request, res: Response): Promise<void> {
    if (!res.locals.role || res.locals.role !== 'manager') {
        res.status(403).json({ message: 'Forbidden' });
        return;
    }

    try {
        const employees = await ser_getEmployees();
        res.status(200).json({ employees });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}