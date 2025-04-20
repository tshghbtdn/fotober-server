const { Client } = require('pg');  // Hoặc 'pg' trong TypeScript

const client = new Client({
  host: process.env.PG_HOST, // Đảm bảo host đúng
  port: parseInt(process.env.PG_PORT || '5432', 10),  // Cổng đúng cho pooler
  database: 'postgres',
  user: process.env.PG_USER,  // Tên người dùng
  password: process.env.PG_PASSWORD,  // Mật khẩu đúng
  ssl: { rejectUnauthorized: false }  // SSL cấu hình đúng
});

export async function connectDB(): Promise<void> {
  try {
    await client.connect()
    console.log('✅ Connected to Supabase PostgreSQL (Transaction Pooler)!')

    const res = await client.query('SELECT NOW()')
    console.log('🕒 Current time from DB:', res.rows[0])

    await client.end()
  } catch (err) {
    console.error('❌ Error connecting to database:', err)
  }
}
