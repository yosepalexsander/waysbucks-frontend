import cookie from 'js-cookie';
import type { GetServerSidePropsContext } from 'next';
import Router from 'next/router';
import cookies from 'next-cookies';

import { getUser } from '@/api';
import { createJSONRequestConfig } from '@/lib/axios';
import type { GetUserResponse, User } from '@/types';

/** Authentication for SSR Pages
 *
 * @param ctx Next SSR props context
 * @returns User data
 */
export const authSSR = async (ctx: GetServerSidePropsContext): Promise<User | undefined> => {
  const { token } = cookies(ctx);
  const config = createJSONRequestConfig({
    Authorization: `Bearer ${token}`,
  });
  const response = await getUser<GetUserResponse>(config);

  if (response && response.payload) {
    return response.payload;
  }

  if (typeof window === 'undefined') {
    ctx.res?.writeHead(302, { Location: '/signin' });
    ctx.res?.end();
  } else {
    Router.push(
      {
        pathname: '/signin',
      },
      '/signin',
    );
  }

  return;
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

  const response = await getUser<GetUserResponse>(config);

  if (response && response.payload) {
    return response.payload;
  }

  throw new Error('Authentication failed');
};

export const authSignout = async () => {
  cookie.remove('id');
  cookie.remove('token');

  window.localStorage.setItem('logout', Date.now().toString());
  Router.push('/signin');
};

export const authSignin = ({ token, redirect }: { token: string; redirect: string }) => {
  cookie.set('token', token, {
    expires: 1,
  });

  Router.push(redirect);
};
