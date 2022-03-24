import axios from 'axios';

import { instance } from '@/lib/axios';
import type { AxiosRequestConfig, SigninResponse, SignupResponse } from '@/types';
import { authSignin, authSignout } from '@/utils';

export async function register(data: Record<string, unknown>, config?: AxiosRequestConfig) {
  try {
    const { data: resData, status } = await instance.post<SignupResponse>('auth/register', data, config);

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

export async function signin(data: Record<string, unknown>, config?: AxiosRequestConfig) {
  try {
    const { data: resData } = await instance.post<SigninResponse>('auth/login', data, config);

    await axios.post(
      '/api/signin',
      {
        token: resData.payload.token,
      },
      { headers: { 'Content-Type': 'application/json' } },
    );

    authSignin({ token: resData.payload.token, redirect: '/' });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 400) {
        throw new Error('Invalid email or password');
      }
    }

    throw error;
  }
}

export async function signout() {
  try {
    await axios.post('/api/signout', {}, { headers: { 'Content-Type': 'application/json' } });

    authSignout();
  } catch (error) {
    throw new Error('Signout failed');
  }
}
