import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const middleware = async (req: NextRequest, _ev: NextFetchEvent) => {
  const { token } = req.cookies;
  const url = req.nextUrl.clone();
  const params = url.pathname.split('/');

  const protectedRoutes = ['cart', 'account'];
  const authRoutes = ['signin', 'signup'];
  if (params[1]) {
    if (authRoutes.includes(params[1]) && token) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    } else if (protectedRoutes.includes(params[1]) && !token) {
      const response = NextResponse.redirect(url);

      response.clearCookie('token');
      return response;
    } else if (params[1] === 'admin') {
      const headers = { authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}auth/account`, { headers });
      const { payload } = await response.json();

      if (!payload.is_admin) {
        url.pathname = '/';
        NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
};
