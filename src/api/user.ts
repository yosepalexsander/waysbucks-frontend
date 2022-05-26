import { instance } from '@/lib/axios';
import type { AxiosRequestConfig, CommonResponse, GetUserResponse, User } from '@/types';

export async function getUser(config?: AxiosRequestConfig) {
  try {
    const response = await instance.get<GetUserResponse>('auth/profile', config);

    return response.data.payload;
  } catch (error) {
    throw error;
  }
}

export async function updateUser(data: Partial<User>, config?: AxiosRequestConfig) {
  try {
    await instance.put<CommonResponse>('auth/profile', data, config);
  } catch (error) {
    throw error;
  }
}
