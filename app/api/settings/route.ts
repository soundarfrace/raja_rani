import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows]: any = await pool.query('SELECT setting_key, setting_value, description FROM website_settings');
    const settings: Record<string, string> = {};
    for (const r of rows) {
      settings[r.setting_key] = r.setting_value;
    }
    return NextResponse.json({ success: true, settings, rows });
  } catch (error: any) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    if (body.key && body.value !== undefined) {
      await pool.query(
        'INSERT INTO website_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)',
        [body.key, body.value]
      );
      return NextResponse.json({ success: true, message: 'Setting updated successfully' });
    }

    if (body.settings && typeof body.settings === 'object') {
      for (const [k, v] of Object.entries(body.settings)) {
        await pool.query(
          'INSERT INTO website_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)',
          [k, String(v)]
        );
      }
      return NextResponse.json({ success: true, message: 'Settings updated successfully' });
    }

    return NextResponse.json({ success: false, error: 'Invalid settings payload' }, { status: 400 });
  } catch (error: any) {
    console.error('Error saving settings:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
