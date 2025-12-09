import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Only protect admin routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('token')?.value;
    
    // If no token and trying to access admin routes (except login), redirect to admin login
    if (!token && pathname !== '/admin/login') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    // If has token and trying to access admin login, redirect to admin dashboard
    if (token && pathname === '/admin/login') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};