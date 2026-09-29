import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');
  const url = req.nextUrl;

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    // Ganti 'admin' dan 'rahasia123' dengan username dan password Anda sendiri
    if (user === 'admin' && pwd === 'Danendra12') {
      return NextResponse.next();
    }
  }

  // Memunculkan popup login bawaan browser jika belum login
  return new NextResponse('Akses Ditolak. Silakan login.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Area Admin Portofolio"',
    },
  });
}

// Konfigurasi ini memastikan gembok hanya berlaku di halaman /admin
export const config = {
  matcher: ['/admin/:path*'],
};