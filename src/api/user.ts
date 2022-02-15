import { instance } from '@/lib/axios';
import type { AxiosRequestConfig, AxiosResponse, CommonResponse, GetUserResponse } from '@/types';

/**Request for get user data with corresponding id
 *
 * @param id user id
 * @returns response object
 */
export async function getUser<T extends GetUserResponse>(config?: AxiosRequestConfig): Promise<T | null> {
  try {
    return (await instance.get<T>('/auth/account', config)).data;
  } catch (error) {
    throw error;
  }
}

/**Request for update user
 *
 * @param id product to be udpated
 * @param data request body
 * @param config axios request config
 * @returns response object
 */
export async function updateUser<T extends CommonResponse>(
  data: Record<string, any>,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  try {
    return await instance.put<T>('/auth/account', data, config);
  } catch (error) {
    throw error;
  }
}
