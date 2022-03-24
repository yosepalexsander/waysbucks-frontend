import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const middleware = async (req: NextRequest, _ev: NextFetchEvent) => {
  const { token } = req.cookies;
  const url = req.nextUrl.clone();
  const params = url.pathname.split('/');

  const authRoutes = ['signin', 'signup'];
  const protectedRoutes = ['cart', 'account'];

  if (params[1] && authRoutes.includes(params[1]) && token) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  if (params[1] && protectedRoutes.includes(params[1])) {
    if (!token) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }

    try {
      const headers = { authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
      const responseAuth = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}auth/account`, { headers });
      const { payload } = await responseAuth.json();

      if (!responseAuth.ok) {
        url.pathname = '/';

        const response = NextResponse.redirect(url);

        response.clearCookie('token');
        return response;
      }

      if (params[1] === 'admin' && !payload.is_admin) {
        url.pathname = '/';
        return NextResponse.redirect(url);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(String(error));
      }
    }
  }

  return NextResponse.next();
};
