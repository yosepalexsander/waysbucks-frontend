import axios from 'axios';

import { instance } from '@/lib/axios';
import type { AxiosRequestConfig, SigninResponse, SignupResponse } from '@/types';
import { authSignin, authSignout } from '@/utils';

/**Request for create a new user
 *
 * @param data request body
 * @param config axios request config
 * @returns response object
 */
export async function register<T extends SignupResponse>(
  data: Record<string, unknown>,
  config: AxiosRequestConfig,
): Promise<void> {
  try {
    const { data: resData, status } = await instance.post<T>('auth/register', data, config);

    if (status === 400) {
      throw new Error('email already registered');
    }

    await axios.post(
      '/api/signin',
      {
        token: resData.payload.token,
      },
      { headers: { 'Content-Type': 'application/json' } },
    );

    authSignin({ token: resData.payload.token, redirect: '/' });
  } catch (error) {
    throw error;
  }
}

/**Request for user login
 *
 * @param data request body
 * @param config axios request config
 * @returns response object
 */
export async function signin<T extends SigninResponse>(data: Record<string, unknown>, config: AxiosRequestConfig) {
  try {
    const { data: resData, status } = await instance.post<T>('auth/login', data, config);

    if (status === 400) {
      throw new Error('invalid email or password');
    }

    await axios.post(
      '/api/signin',
      {
        token: resData.payload.token,
      },
      { headers: { 'Content-Type': 'application/json' } },
    );

    authSignin({ token: resData.payload.token, redirect: '/' });
  } catch (error) {
    throw error;
  }
}

/**Request for user logout
 *
 * @param data request body
 * @param config axios request config
 * @returns response object
 */
export async function signout() {
  try {
    await axios.post('/api/signout', {}, { headers: { 'Content-Type': 'application/json' } });

    authSignout();
  } catch (error) {
    throw new Error('Signout failed');
  }
}
