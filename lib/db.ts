import mysql from 'mysql2/promise'

// Global connection pool for Next.js API routes & server components
declare global {
  // eslint-disable-next-line no-var
  var _mysqlPool: mysql.Pool | undefined
}

const pool = global._mysqlPool || mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'NewPassword@123',
  database: process.env.DB_NAME || 'rajarani_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

if (process.env.NODE_ENV !== 'production') {
  global._mysqlPool = pool
}

export default pool

// Helper to run queries easily with type safety
export async function query<T = any>(sql: string, params: any[] = []): Promise<T> {
  const [rows] = await pool.execute(sql, params)
  return rows as T
}
