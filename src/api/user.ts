import { instance } from '@/lib/axios';
import type { AxiosRequestConfig, CommonResponse, GetUserResponse, User } from '@/types';

export async function getUser(config?: AxiosRequestConfig): Promise<User | null> {
  try {
    const response = await instance.get<GetUserResponse>('auth/account', config);

    return response.data.payload;
  } catch (error) {
    throw error;
  }
}

export async function updateUser(data: Record<string, unknown>, config?: AxiosRequestConfig) {
  try {
    return await instance.put<CommonResponse>('auth/account', data, config);
  } catch (error) {
    throw error;
  }
}
