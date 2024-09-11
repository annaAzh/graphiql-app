import { NextRequest, NextResponse } from 'next/server';
import { PRIVATE_PAGES, PUBLIC_PAGES } from 'shared/constants';
import { auth } from 'shared/lib/api';

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const user = auth.currentUser;
  const isProtectedRoute = PRIVATE_PAGES.includes(path);
  const isPublicRoute = PUBLIC_PAGES.includes(path);

  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  if (isPublicRoute && user) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
