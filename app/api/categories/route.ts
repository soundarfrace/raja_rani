import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, slug, note, image, display_order, is_active FROM categories ORDER BY display_order ASC, name ASC'
    );
    return NextResponse.json({ success: true, categories: rows });
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, note, image, display_order, is_active } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, error: 'Category name is required' }, { status: 400 });
    }

    const slug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const order = display_order || 0;
    const active = is_active !== false;

    const [result]: any = await pool.query(
      'INSERT INTO categories (name, slug, note, image, display_order, is_active) VALUES (?, ?, ?, ?, ?, ?)',
      [name.trim(), slug, note || '', image || '', order, active]
    );

    return NextResponse.json({
      success: true,
      category: {
        id: result.insertId,
        name: name.trim(),
        slug,
        note,
        image,
        display_order: order,
        is_active: active
      }
    });
  } catch (error: any) {
    console.error('Error creating category:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, note, image, display_order, is_active } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Category ID is required' }, { status: 400 });
    }

    const slug = name ? name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') : undefined;

    await pool.query(
      `UPDATE categories 
       SET name = COALESCE(?, name),
           slug = COALESCE(?, slug),
           note = COALESCE(?, note),
           image = COALESCE(?, image),
           display_order = COALESCE(?, display_order),
           is_active = COALESCE(?, is_active)
       WHERE id = ?`,
      [name?.trim() || null, slug || null, note !== undefined ? note : null, image !== undefined ? image : null, display_order !== undefined ? display_order : null, is_active !== undefined ? is_active : null, id]
    );

    return NextResponse.json({ success: true, message: 'Category updated successfully' });
  } catch (error: any) {
    console.error('Error updating category:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Category ID is required' }, { status: 400 });
    }

    await pool.query('DELETE FROM categories WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Category deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
