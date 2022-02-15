import { checkStatusRes, instance } from '@/lib/axios';
import type { AxiosRequestConfig, AxiosResponse, Cart, CommonResponse, GetCartsResponse } from '@/types';

/**Request for get user carts.
 *
 * @returns response object
 */
export async function getCarts<T extends GetCartsResponse>(): Promise<Cart[] | undefined> {
  try {
    const response = await instance.get<T>('/carts');
    checkStatusRes(
      response.status,
      response.status === 503 ? 'Third Party Service Unavailable' : response.data.message,
    );
    return response.data.payload;
  } catch (error) {
    throw error;
  }
}

/**Request for post new cart by user
 *
 * @param data request body
 * @param config axios request config
 * @returns response object
 */
export async function postCart<T extends CommonResponse>(
  data: Record<string, any>,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  try {
    return await instance.post<T>('/carts', data, config);
  } catch (error) {
    throw error;
  }
}

/**Request for update cart by user
 *
 * @param id cart to be udpated
 * @param data request body
 * @param config axios request config
 * @returns response object
 */
export async function updateCart<T extends CommonResponse>(
  id: number,
  data: Record<string, any>,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  try {
    return await instance.put<T>(`/carts/${id}`, data, config);
  } catch (error) {
    throw error;
  }
}

/**Request for delete cart
 *
 * @param id cart to be deleted
 * @returns response object
 */
export async function deleteCart<T extends CommonResponse>(id: number): Promise<AxiosResponse<T>> {
  try {
    return await instance.delete<T>(`/carts/${id}`);
  } catch (error) {
    throw error;
  }
}
