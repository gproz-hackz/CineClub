import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token');
  
  // Protect Profile and Watchlist routes
  if (request.nextUrl.pathname.startsWith('/profile') || 
      request.nextUrl.pathname.startsWith('/watchlist')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}
