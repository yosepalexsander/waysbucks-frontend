import { checkStatusRes, instance } from '@/lib/axios';
import type { Address, AxiosRequestConfig, CommonResponse, GetAddressResponse } from '@/types';

export async function getAddress(config?: AxiosRequestConfig): Promise<Address[] | undefined> {
  try {
    const response = await instance.get<GetAddressResponse>('/address', config);
    checkStatusRes(response.status, response.data.message);
    return response.data.payload;
  } catch (error) {
    throw error;
  }
}

export async function createAddress(data: Partial<Address>, config?: AxiosRequestConfig) {
  try {
    const response = await instance.post<CommonResponse>('/address', data, config);
    checkStatusRes(response.status, response.data.message);
  } catch (error) {
    throw error;
  }
}

export async function updateAddress(id: string, data: Partial<Address>, config?: AxiosRequestConfig) {
  try {
    const response = await instance.put<CommonResponse>(`/address/${id}`, data, config);
    checkStatusRes(response.status, response.data.message);
  } catch (error) {
    throw error;
  }
}

export async function deleteAddress(id: string) {
  try {
    const response = await instance.delete<CommonResponse>(`/address/${id}`);
    checkStatusRes(response.status, response.data.message);
  } catch (error) {
    throw error;
  }
}
