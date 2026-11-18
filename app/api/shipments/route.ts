import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows]: any = await pool.query(
      'SELECT id, order_id as orderId, partner, awb, destination, eta, status FROM shipments ORDER BY created_at DESC'
    );
    return NextResponse.json({ success: true, shipments: rows });
  } catch (error: any) {
    console.error('Error fetching shipments:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, orderId, partner, awb, destination, eta, status } = body;
    const shipmentId = id || `SHP-${Math.floor(100 + Math.random() * 900)}`;

    await pool.query(
      'INSERT INTO shipments (id, order_id, partner, awb, destination, eta, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [shipmentId, orderId, partner, awb, destination, eta, status || 'In Transit']
    );

    return NextResponse.json({ success: true, shipment: { id: shipmentId, orderId, partner, awb, destination, eta, status: status || 'In Transit' } });
  } catch (error: any) {
    console.error('Error creating shipment:', error);
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

    await pool.query('UPDATE shipments SET status = ? WHERE id = ?', [status, id]);
    return NextResponse.json({ success: true, message: 'Shipment updated successfully' });
  } catch (error: any) {
    console.error('Error updating shipment:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
