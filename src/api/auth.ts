import axios from 'axios';

import { instance } from '@/lib/axios';
import type { AuthResponse, AxiosRequestConfig, Token } from '@/types';
import { authLogin, authSignout } from '@/utils';

export async function register(body: Record<string, unknown>, config?: AxiosRequestConfig) {
  try {
    const {
      data: { payload },
    } = await instance.post<AuthResponse>('/auth/register', body, config);

    await axios.post('/api/login', { token: payload.token }, { headers: { 'Content-Type': 'application/json' } });

    authLogin({ token: payload.token, redirect: '/' });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 400) {
        throw error.response.data.message;
      }
    }

    throw error;
  }
}

export async function login(body: Record<string, unknown>, config?: AxiosRequestConfig) {
  try {
    const {
      data: { payload },
    } = await instance.post<AuthResponse>('/auth/login', body, config);

    await axios.post('/api/login', { token: payload.token }, { headers: { 'Content-Type': 'application/json' } });

    authLogin({ token: payload.token, redirect: '/' });
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

export async function loginWithGoogle(body: Token) {
  try {
    const {
      data: { payload },
    } = await instance.post<AuthResponse>('/auth/google/login', body);

    await axios.post('/api/login', { token: payload.token }, { headers: { 'Content-Type': 'application/json' } });

    authLogin({ token: payload.token, redirect: '/' });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data.message);
      }
    }

    throw error;
  }
}
