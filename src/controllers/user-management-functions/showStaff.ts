import { Request, Response } from 'express';
import { getStaffList } from '../../services';

export const getStaffListController = async (req: Request, res: Response) => {
  try {
    const staffList = await getStaffList();
    res.status(200).json({
      message: 'Staff list fetched successfully',
      data: staffList
    });
  } catch (error) {
    console.error('Error in getStaffListController:', error);
    res.status(500).json({
      message: 'Failed to fetch staff list',
      error: (error as Error).message
    });
  }
};
