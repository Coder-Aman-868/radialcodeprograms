import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only redirect to dashboard if already logged in and trying to access login
  if (pathname === '/admin/login') {
    const token = request.cookies.get('admin-token')?.value;

    // Only redirect if token exists and is not empty
    if (token && token.trim() && token !== 'undefined' && token !== 'null') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/login']
};