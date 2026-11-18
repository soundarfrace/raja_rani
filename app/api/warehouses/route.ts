import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows]: any = await pool.query(
      'SELECT id, name, city, total_units as totalUnits, capacity_usage as capacityUsage, manager FROM warehouses ORDER BY name ASC'
    );
    return NextResponse.json({ success: true, warehouses: rows });
  } catch (error: any) {
    console.error('Error fetching warehouses:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
