import { Request, Response } from 'express';
import { getUserKPI } from '../../services';

export const showKPI = async (req: Request, res: Response): Promise<void> => {
  const userId = req.query.userId as string;

  // Kiểm tra dữ liệu bắt buộc
  if (!userId) {
    res.status(400).json({
      message: 'Query parameter "userId" is required.',
    });
    return;
  }

  try {
    // Gọi service để lấy dữ liệu KPI
    const data = await getUserKPI(userId);

    res.status(200).json({
      message: 'KPI fetched successfully',
      data,
    });
  } catch (error: any) {
    console.error('Error fetching KPI:', error);
    res.status(500).json({
      message: 'Error fetching KPI',
      error: error.message,
    });
  }
};
