import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const protectedRoutes = [
    '/events',
    '/availability',
    '/discover',
    '/setting',
    '/onboarding',
    '/roles',
  ];

  const isProtected = protectedRoutes.some(route =>
    req.nextUrl.pathname.startsWith(route),
  );

  if (isProtected && !session) {
    console.log('from middleware');
    console.log(session);
    console.log('middleware vignesh');
    return NextResponse.redirect(new URL('/access-error', req.url));
  }

  return res;
}

export const config = {
  matcher: [
    '/events/:path*',
    '/availability/:path*',
    '/discover/:path*',
    '/setting/:path*',
    '/onboarding/:path*',
    '/roles',
  ],
};
