import axios from 'axios';

import { instance } from '@/lib/axios';
import type { AxiosRequestConfig, SigninResponse, SignupResponse } from '@/types';
import { authSignin } from '@/utils';

/**Request for create a new user
 *
 * @param data request body
 * @param config axios request config
 * @returns response object
 */
export async function register<T extends SignupResponse>(
  data: Record<string, any>,
  config: AxiosRequestConfig,
): Promise<void> {
  try {
    const { data: resData } = await instance.post<T>('/auth/register', data, config);

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
export async function signin<T extends SigninResponse>(
  data: Record<string, any>,
  config: AxiosRequestConfig,
): Promise<void> {
  try {
    const { data: resData } = await instance.post<T>('/auth/login', data, config);
    await axios.post(
      '/api/signin',
      {
        token: resData.payload.token,
      },
      { headers: { 'Content-Type': 'application/json' } },
    );

    authSignin({ token: resData.payload.token, redirect: '/' });
  } catch (e) {
    console.log(e);
    throw new Error('Invalid Email or Password');
  }
}

/**Request for user logout
 *
 * @param data request body
 * @param config axios request config
 * @returns response object
 */
export async function signout(): Promise<null> {
  return await axios.post('/api/signout', {}, { headers: { 'Content-Type': 'application/json' } });
}
