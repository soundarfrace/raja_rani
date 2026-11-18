import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT id, name, logo, description, display_order, is_active FROM brands ORDER BY display_order ASC, name ASC');
    return NextResponse.json({ success: true, brands: rows });
  } catch (error: any) {
    console.error('Error fetching brands:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, logo, description, display_order, is_active } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, error: 'Brand name is required' }, { status: 400 });
    }

    const [result]: any = await pool.query(
      'INSERT INTO brands (name, logo, description, display_order, is_active) VALUES (?, ?, ?, ?, ?)',
      [name.trim().toUpperCase(), logo || '', description || '', display_order || 0, is_active !== false]
    );

    return NextResponse.json({
      success: true,
      brand: { id: result.insertId, name: name.trim().toUpperCase(), logo, description }
    });
  } catch (error: any) {
    console.error('Error adding brand:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, logo, description, display_order, is_active } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Brand ID is required' }, { status: 400 });
    }

    await pool.query(
      `UPDATE brands 
       SET name = COALESCE(?, name),
           logo = COALESCE(?, logo),
           description = COALESCE(?, description),
           display_order = COALESCE(?, display_order),
           is_active = COALESCE(?, is_active)
       WHERE id = ?`,
      [name?.trim().toUpperCase() || null, logo !== undefined ? logo : null, description !== undefined ? description : null, display_order !== undefined ? display_order : null, is_active !== undefined ? is_active : null, id]
    );

    return NextResponse.json({ success: true, message: 'Brand updated successfully' });
  } catch (error: any) {
    console.error('Error updating brand:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Brand ID is required' }, { status: 400 });
    }

    await pool.query('DELETE FROM brands WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Brand deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting brand:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
