import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const section = searchParams.get('section');

    let query = 'SELECT id, content_key, content_value, section, label, input_type, updated_at FROM website_content';
    const params: any[] = [];

    if (section) {
      query += ' WHERE section = ?';
      params.push(section);
    }
    query += ' ORDER BY section ASC, id ASC';

    const [rows]: any = await pool.query(query, params);

    // Also build a dictionary object for convenient frontend lookups
    const dictionary: Record<string, string> = {};
    for (const item of rows) {
      dictionary[item.content_key] = item.content_value;
    }

    return NextResponse.json({ success: true, items: rows, content: dictionary });
  } catch (error: any) {
    console.error('Error fetching website content:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    // Supports updating a single key: { key: 'hero_title', value: '...' }
    // Or multiple keys at once: { items: { hero_title: '...', hero_subtitle: '...' } }
    if (body.key && body.value !== undefined) {
      await pool.query(
        'UPDATE website_content SET content_value = ? WHERE content_key = ?',
        [body.value, body.key]
      );
      return NextResponse.json({ success: true, message: 'Content updated successfully' });
    }

    if (body.items && typeof body.items === 'object') {
      const keys = Object.keys(body.items);
      for (const k of keys) {
        await pool.query(
          'UPDATE website_content SET content_value = ? WHERE content_key = ?',
          [body.items[k], k]
        );
      }
      return NextResponse.json({ success: true, message: 'All content updated successfully' });
    }

    return NextResponse.json({ success: false, error: 'Invalid update payload' }, { status: 400 });
  } catch (error: any) {
    console.error('Error updating content:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { key, value, section, label, type } = body;

    if (!key || value === undefined) {
      return NextResponse.json({ success: false, error: 'Key and value are required' }, { status: 400 });
    }

    await pool.query(
      `INSERT INTO website_content (content_key, content_value, section, label, input_type)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE content_value = VALUES(content_value), label = VALUES(label), section = VALUES(section)`,
      [key, value, section || 'general', label || key, type || 'text']
    );

    return NextResponse.json({ success: true, message: 'Content saved successfully' });
  } catch (error: any) {
    console.error('Error creating content item:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
