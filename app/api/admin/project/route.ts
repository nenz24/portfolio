import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Menggunakan server-side client (disarankan menggunakan service role key atau anon key dengan RLS terkelola)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validasi data sederhana
    if (!body.title || !body.description) {
      return NextResponse.json({ error: 'Title dan description wajib diisi' }, { status: 400 });
    }

    // Eksekusi insert ke database Supabase melalui server
    const { data, error } = await supabase
      .from('projects') // Sesuaikan dengan nama tabel database Anda
      .insert([body])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}