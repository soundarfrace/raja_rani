import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const orders: any = await query('SELECT * FROM orders ORDER BY created_at DESC')
    const formatted = orders.map((o: any) => ({
      id: o.id,
      customer: o.customer_name,
      email: o.customer_email,
      date: new Date(o.created_at).toISOString().split('T')[0],
      total: Number(o.total),
      items: o.items_count,
      status: o.status,
      payment: o.payment_status
    }))
    return NextResponse.json({ success: true, orders: formatted })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      id = `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customer,
      email,
      total,
      items = 1,
      status = 'Processing',
      payment = 'Paid'
    } = body

    await query(
      `INSERT INTO orders (id, customer_name, customer_email, total, items_count, status, payment_status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, customer, email, total, items, status, payment]
    )

    return NextResponse.json({ success: true, orderId: id, message: 'Order created' })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: 'Could not create order' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, status } = body
    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Order id and status required' }, { status: 400 })
    }
    await query('UPDATE orders SET status = ? WHERE id = ?', [status, id])
    return NextResponse.json({ success: true, message: `Order ${id} updated` })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
