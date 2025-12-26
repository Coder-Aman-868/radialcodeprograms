import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  
  // Mock admin credentials
  if (email === 'admin@radialcode.com' && password === 'admin123') {
    const token = 'mock-admin-token-' + Date.now();
    
    const response = NextResponse.json({
      success: true,
      token,
      user: {
        id: 1,
        email: 'admin@radialcode.com',
        username: 'admin'
      }
    });
    
    // Set cookie
    response.cookies.set('admin-token', token, {
      httpOnly: false, // Allow JavaScript access for client-side auth checks
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });
    
    return response;
  }
  
  return NextResponse.json(
    { success: false, error: 'Invalid credentials' },
    { status: 401 }
  );
}