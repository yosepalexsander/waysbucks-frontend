import cookie from 'js-cookie';
import type { GetServerSidePropsContext } from 'next';
import Router from 'next/router';
import cookies from 'next-cookies';

import { getUser } from '@/api';
import { createJSONRequestConfig } from '@/lib/axios';
import type { User } from '@/types';

/** Authentication for SSR Pages
 *
 * @param ctx Next SSR props context
 * @returns User data
 */
export const authSSR = async (ctx: GetServerSidePropsContext) => {
  const { token } = cookies(ctx);
  const config = createJSONRequestConfig({
    Authorization: `Bearer ${token}`,
  });

  try {
    const user = await getUser(config);

    return user;
  } catch (error) {
    if (typeof window === 'undefined') {
      ctx.res?.writeHead(302, { Location: '/login' });
      ctx.res?.end();
    } else {
      Router.push(
        {
          pathname: '/login',
        },
        '/login',
      );
    }
    return;
  }
};

/** Authentication for SSG Pages
 *
 * @param
 * @returns User data
 */
export const authCSR = async (): Promise<User | undefined> => {
  const token = cookie.get('token');
  const config = createJSONRequestConfig({
    Authorization: `Bearer ${token}`,
  });

  try {
    const user = await getUser(config);

    return user;
  } catch (error) {
    throw new Error('Authentication failed');
  }
};

export const authSignout = () => {
  cookie.remove('token');

  window.localStorage.setItem('logout', Date.now().toString());
  Router.push('/login');
};

export const authLogin = ({ token, redirect }: { token: string; redirect: string }) => {
  cookie.set('token', token, {
    expires: 1,
  });

  window.location.href = process.env.NEXT_PUBLIC_BASE_URL + redirect;
};
