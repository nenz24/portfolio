import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    try {
      // Mengambil nilai token dan mencegah error jika format header salah (Fix bug #3)
      const authValue = basicAuth.split(' ')[1];
      
      if (authValue) {
        const [user, pwd] = atob(authValue).split(':');

        // Mengambil kredensial dari Environment Variables (Fix bug #1)
        const validUser = process.env.ADMIN_USERNAME;
        const validPwd = process.env.ADMIN_PASSWORD;

        if (user === validUser && pwd === validPwd) {
          return NextResponse.next();
        }
      }
    } catch (error) {
      // Jika terjadi error saat memecah header (malformed), tolak akses secara diam-diam
      console.warn('Format otentikasi tidak valid');
    }
  }

  // Memunculkan popup login bawaan browser jika belum login atau login salah
  return new NextResponse('Akses Ditolak. Silakan login.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Area Admin Portofolio"',
    },
  });
}

// Memperluas perlindungan tidak hanya ke UI, tapi ke API endpoint (Fix bug #2)
export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'], 
};