import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const middleware = async (req: NextRequest, _ev: NextFetchEvent) => {
  const { token } = req && req.cookies;
  const url = req.nextUrl.clone();
  const params = url.pathname.split('/');

  const protectedRoutes = ['admin', 'cart', 'account'];
  const authRoutes = ['signin', 'signup'];

  if (params[1]) {
    if (authRoutes.includes(params[1]) && token) {
      return NextResponse.redirect('/');
    } else if (protectedRoutes.includes(params[1]) && !token) {
      return NextResponse.redirect('/');
    }
  }

  return NextResponse.next();
};
