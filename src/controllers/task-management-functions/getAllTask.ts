import { Request, Response } from 'express';
import { getTaskList } from '../../services';

export const getAllTaskController = async (req: Request, res: Response) => {
  try {
    // Gọi hàm getTaskList từ service
    const taskList = await getTaskList();
    
    // Trả về dữ liệu task list thành công
    res.status(200).json({
      message: 'Task list fetched successfully',
      data: taskList
    });
  } catch (error) {
    console.error('Error in getAllTaskController:', error);
    
    // Trả về lỗi nếu không lấy được task list
    res.status(500).json({
      message: 'Failed to fetch task list',
      error: (error as Error).message
    });
  }
};
