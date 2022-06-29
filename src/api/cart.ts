import axios from 'axios';

import { checkStatusRes, instance } from '@/lib/axios';
import type { AxiosRequestConfig, Cart, CommonResponse, GetCartsResponse } from '@/types';

export async function getCarts(): Promise<Cart[] | undefined> {
  try {
    const response = await instance.get<GetCartsResponse>('/carts');
    checkStatusRes(
      response.status,
      response.status === 503 ? 'Third Party Service Unavailable' : response.data.message,
    );
    return response.data.payload;
  } catch (error) {
    throw error;
  }
}

export async function postCart(data: Partial<Cart>, config?: AxiosRequestConfig) {
  try {
    await instance.post<CommonResponse>('/carts', data, config);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && (error.response.status === 401 || error.response.status === 400)) {
        throw new Error('Not Authenticated');
      }
    }

    throw error;
  }
}

export async function updateCart(id: number, data: Partial<Cart>, config?: AxiosRequestConfig) {
  try {
    await instance.put<CommonResponse>(`/carts/${id}`, data, config);
  } catch (error) {
    throw error;
  }
}

export async function deleteCart(id: number) {
  try {
    await instance.delete<CommonResponse>(`/carts/${id}`);
  } catch (error) {
    throw error;
  }
}
