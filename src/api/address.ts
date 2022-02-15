import { checkStatusRes, instance } from '@/lib/axios';
import type { Address, AxiosRequestConfig, AxiosResponse, CommonResponse, GetAddressResponse } from '@/types';

/**Request for get address data with corresponding user id
 *
 * @param id user id
 * @returns response object
 */
export async function getAddress<T extends GetAddressResponse>(
  config?: AxiosRequestConfig,
): Promise<Address[] | undefined> {
  try {
    const response = await instance.get<T>('/address', config);
    checkStatusRes(response.status, response.data.message);
    return response.data.payload;
  } catch (error) {
    throw error;
  }
}

/**Request for post new user address
 *
 * @param data request body
 * @param config axios request config
 * @returns response object
 */
export async function createAddress<T extends CommonResponse>(
  data: Record<string, any>,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  try {
    const response = await instance.post<T>('/address', data, config);
    checkStatusRes(response.status, response.data.message);
    return response;
  } catch (error) {
    throw error;
  }
}

/**Request for update userAddress
 *
 * @param id product to be udpated
 * @param data request body
 * @param config axios request config
 * @returns response object
 */
export async function updateAddress<T extends CommonResponse>(
  id: number,
  data: Record<string, any>,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  try {
    const response = await instance.put<T>(`/address/${id}`, data, config);
    checkStatusRes(response.status, response.data.message);
    return response;
  } catch (error) {
    throw error;
  }
}

/**Request for delete user address
 *
 * @param id address to be deleted
 * @returns response object
 */
export async function deleteAddress<T extends CommonResponse>(id: number): Promise<AxiosResponse<T>> {
  try {
    const response = await instance.delete<T>(`/address/${id}`);
    checkStatusRes(response.status, response.data.message);
    return response;
  } catch (error) {
    throw error;
  }
}
