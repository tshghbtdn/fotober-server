export type JobStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface IJob {
  id: string;
  title: string;
  description: string;
  deadline: string; // hoặc Date nếu dùng đối tượng Date
  createdBy: string; // userId hoặc guestId
  assignedTo: string[]; // danh sách userId
  status: JobStatus;
  createdAt?: string;
}

