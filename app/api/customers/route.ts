import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const customers: any = await query('SELECT * FROM customers ORDER BY orders_count DESC')
    const formatted = customers.map((c: any) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      phone: c.phone,
      orders: c.orders_count,
      spent: Number(c.total_spent),
      city: c.city || 'India',
      joined: new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    }))
    return NextResponse.json({ success: true, customers: formatted })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
