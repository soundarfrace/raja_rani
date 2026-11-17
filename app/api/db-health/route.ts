import { NextResponse } from 'next/server'
import pool, { query } from '@/lib/db'

export async function GET() {
  try {
    const [status]: any = await query('SELECT 1 as connected, DATABASE() as db, VERSION() as version')
    const [counts]: any = await query('SELECT COUNT(*) as productCount FROM products')
    
    return NextResponse.json({
      success: true,
      status: 'Connected',
      database: status.db,
      mysqlVersion: status.version,
      productCount: counts.productCount,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        status: 'Connection Failed',
        error: error.message
      },
      { status: 500 }
    )
  }
}
