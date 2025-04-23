import { client } from '../config/db';

type TaskCompound = {
  name: string;
  description: string;
};

type Task = {
  taskid: string;
  taskname: string;
  description: string;
  operator: string | null;
  tasktype: number;
  request: number;
  done: number;
  progress: number;
  taskcompounds: TaskCompound[];  // Danh sách các nhiệm vụ chi tiết (được lấy từ taskcompound)
};

export async function getTaskList(): Promise<Task[]> {
  const query = `
        SELECT t.taskid, tt.taskname, t.description, t.operator, t.tasktype, t.request, t.done, t.progress, 
           tt.taskcompound
    FROM tasks t
    JOIN tasktypeinfor tt ON t.tasktype = tt.id
    ORDER BY t.taskid ASC
  `;

  try {
    const result = await client.query(query);
    
    // Tổ chức lại dữ liệu để nhóm taskcompound vào từng task
    const tasks = result.rows.map((row: { taskid: any; taskname: any; description: any; operator: any; tasktype: any; request: any; done: any; progress: any; taskcompound: any; }) => {
      return {
        taskid: row.taskid,
        taskname: row.taskname,
        description: row.description,
        operator: row.operator,
        tasktype: row.tasktype,
        request: row.request,
        done: row.done,
        progress: row.progress,
        taskcompounds: row.taskcompound ? row.taskcompound : []  // taskcompound nếu có, nếu không thì rỗng
      };
    });

    return tasks;
  } catch (error) {
    console.error('Error fetching task list:', error);
    throw new Error('Unable to fetch task list');
  }
}
