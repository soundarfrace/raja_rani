import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows]: any = await pool.query(
      'SELECT id, order_id as orderId, customer, product, reason, amount, status, requested FROM returns ORDER BY created_at DESC'
    );
    return NextResponse.json({ success: true, returns: rows });
  } catch (error: any) {
    console.error('Error fetching returns:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'id and status are required' }, { status: 400 });
    }

    await pool.query('UPDATE returns SET status = ? WHERE id = ?', [status, id]);
    return NextResponse.json({ success: true, message: 'Return updated successfully' });
  } catch (error: any) {
    console.error('Error updating return:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
