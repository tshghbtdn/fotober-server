// File: src/services/accounts/getNameById.ts
import { client } from '../../config/db';

export async function ser_getNameById(userId: string): Promise<string | null> {
  try {
    const res = await client.query(
      'SELECT name FROM users WHERE id = $1',
      [userId]
    );
    return res.rows[0]?.name ?? null;
  } catch (error) {
    console.error('Error in getNameById:', error);
    return null;
  }
}
