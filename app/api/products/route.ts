import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const brand = searchParams.get('brand')
    const search = searchParams.get('search')
    const maxPrice = searchParams.get('maxPrice')
    const minRating = searchParams.get('minRating')
    const inStock = searchParams.get('inStock')

    let sql = 'SELECT * FROM products WHERE 1=1'
    const params: any[] = []

    if (category && category !== 'All') {
      sql += ' AND category = ?'
      params.push(category)
    }

    if (brand && brand !== 'All') {
      sql += ' AND brand = ?'
      params.push(brand)
    }

    if (search) {
      sql += ' AND (name LIKE ? OR brand LIKE ? OR category LIKE ?)'
      const term = `%${search}%`
      params.push(term, term, term)
    }

    if (maxPrice) {
      sql += ' AND price <= ?'
      params.push(Number(maxPrice))
    }

    if (minRating) {
      sql += ' AND rating >= ?'
      params.push(Number(minRating))
    }

    if (inStock === 'true') {
      sql += ' AND in_stock = 1'
    }

    sql += ' ORDER BY id ASC'

    const rows: any = await query(sql, params)

    // Format fields for frontend compatibility
    const formatted = rows.map((r: any) => ({
      id: r.id,
      brand: r.brand,
      name: r.name,
      category: r.category,
      price: Number(r.price),
      oldPrice: Number(r.old_price) || Number(r.price),
      stock: r.stock,
      sales: r.sales,
      rating: Number(r.rating) || 4.5,
      reviews: r.reviews_count || 50,
      energyStars: r.energy_stars || 5,
      inStock: Boolean(r.in_stock),
      image: r.image,
      tag: r.tag,
      status: r.status
    }))

    return NextResponse.json({ success: true, products: formatted })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      brand,
      name,
      category,
      price,
      oldPrice,
      stock = 10,
      image = '',
      tag = 'Thoughtfully chosen',
      status = 'Active'
    } = body

    if (!name || !brand || !price) {
      return NextResponse.json({ success: false, error: 'Missing required product fields' }, { status: 400 })
    }

    const result: any = await query(
      `INSERT INTO products (brand, name, category, price, old_price, stock, image, tag, status, in_stock)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [brand, name, category, price, oldPrice || price, stock, image, tag, status, stock > 0 ? 1 : 0]
    )

    return NextResponse.json({
      success: true,
      productId: result.insertId,
      message: 'Product added successfully'
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: 'Could not save product' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ success: false, error: 'Product ID required' }, { status: 400 })
    }
    await query('DELETE FROM products WHERE id = ?', [Number(id)])
    return NextResponse.json({ success: true, message: 'Product deleted' })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: 'Could not delete product' }, { status: 500 })
  }
}
