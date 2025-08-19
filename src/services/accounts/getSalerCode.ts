// File: src/services/accounts/getSalerCode.ts
import { client } from '../../config/db';

export async function ser_getSalerCode(userId: string): Promise<string | null> {
  try {
    const res = await client.query(
      `SELECT cs_code
       FROM saler
       WHERE id = $1`,
      [userId]
    );

    if (res.rows.length === 0) return null;

    return res.rows[0].cs_code ?? null;
  } catch (error) {
    console.error('Error in ser_getSalerCode:', error);
    return null;
  }
}
