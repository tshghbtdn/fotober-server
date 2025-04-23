import { client } from '../config/db';

type StaffUser = {
  id: string;
  name: string;
};

export async function getStaffList(): Promise<StaffUser[]> {
  const query = `
    SELECT id, name
    FROM users
    WHERE role = 'staff'
  `;

  try {
    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching staff list:', error);
    throw new Error('Unable to fetch staff list');
  }
}
