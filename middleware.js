import { NextResponse } from 'next/server';

// Middleware only runs on the edge, so no Appwrite SDK here

export function middleware(request) {
  // Adjust this cookie name if your Appwrite project uses a different one
  const sessionCookie = request.cookies.get('a_session_default');

  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Define which routes are protected
export const config = {
  matcher: ['/dashboard', '/feed'],
};
