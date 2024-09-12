import { NextRequest, NextResponse } from 'next/server';
import { PRIVATE_PAGES, PUBLIC_PAGES } from 'shared/constants';
import { Path } from 'shared/types/path';

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const cookies = req.cookies.get('user')?.value;
  const isProtectedRoute = PRIVATE_PAGES.includes(path);
  const isPublicRoute = PUBLIC_PAGES.includes(path);

  if (isProtectedRoute && !cookies) {
    return NextResponse.redirect(new URL(Path.MAIN, req.nextUrl));
  }

  if (isPublicRoute && cookies) {
    return NextResponse.redirect(new URL(Path.MAIN, req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
