import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const coupons: any = await query('SELECT * FROM coupons ORDER BY id DESC')
    const formatted = coupons.map((c: any) => ({
      id: c.id,
      code: c.code,
      discount: c.discount,
      type: c.type,
      minOrder: Number(c.min_order),
      usage: `${c.usage_count || 0} times`,
      status: c.status,
      expiry: c.expiry ? new Date(c.expiry).toISOString().split('T')[0] : '2026-12-31'
    }))
    return NextResponse.json({ success: true, coupons: formatted })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { code, discount, type = 'Percentage', minOrder = 10000, expiry = '2026-12-31' } = body
    if (!code || !discount) {
      return NextResponse.json({ success: false, error: 'Code and discount required' }, { status: 400 })
    }

    const res: any = await query(
      `INSERT INTO coupons (code, discount, type, min_order, expiry, status, usage_count)
       VALUES (?, ?, ?, ?, ?, 'Active', 0)`,
      [code.toUpperCase().trim(), discount, type, minOrder, expiry]
    )

    return NextResponse.json({ success: true, couponId: res.insertId, message: 'Coupon created' })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: 'Could not create coupon' }, { status: 500 })
  }
}
