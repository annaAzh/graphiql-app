import { NextRequest, NextResponse } from 'next/server';
import { i18nRouter } from 'next-i18n-router';
import i18nConfig from '../i18nConfig';
import { PRIVATE_PAGES, PUBLIC_PAGES } from 'shared/constants';
import { Locale } from 'shared/types/path';

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname.replace(Locale.RU, '');
  const locale = req.nextUrl.pathname.startsWith(Locale.RU)
    ? Locale.RU
    : Locale.EN;
  const cookies = req.cookies.get('user')?.value;
  const isProtectedRoute = PRIVATE_PAGES.includes(path);
  const isPublicRoute = PUBLIC_PAGES.includes(path);

  if (isProtectedRoute && !cookies) {
    return NextResponse.redirect(new URL(`${locale}`, req.nextUrl));
  }

  if (isPublicRoute && cookies) {
    return NextResponse.redirect(new URL(`${locale}`, req.nextUrl));
  }

  return i18nRouter(req, i18nConfig);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
