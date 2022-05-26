import type { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import axios from 'axios';
import cookie from 'js-cookie';

import type { RequestError } from '@/types';

export const checkStatusRes = (status: number, errMsg: string) => {
  if (status != 200) {
    const error: RequestError = {
      name: 'API request',
      status: status,
      message: errMsg,
    };

    throw error;
  }
};

export const createJSONRequestConfig = (headers?: AxiosRequestHeaders): AxiosRequestConfig => {
  const newConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };
  return newConfig;
};

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

instance.interceptors.request.use((request) => {
  const token = cookie.get('token') ?? '';

  if (request.headers && !request.headers.Authorization) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
});
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 401) {
        cookie.remove('token');
      }
    }

    return Promise.reject(error);
  },
);
