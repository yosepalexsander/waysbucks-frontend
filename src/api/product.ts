import { checkStatusRes, instance } from '@/lib/axios';
import type { AxiosRequestConfig, AxiosResponse, CommonResponse } from '@/types';

/**Request for get all products
 *
 * @returns response object
 */
export async function getProducts<T>(): Promise<T> {
  const response = await instance.get<T>('/products');
  checkStatusRes(response.status, response.status === 503 ? 'Third Party Service Unavailable' : '');
  return response.data;
}

/**Request for get product with corresponding id
 *
 * @param id product id
 * @returns response object
 */
export async function getProduct<T>(id: string): Promise<T> {
  try {
    const response = await instance.get<T>(`/products/${id}`);
    checkStatusRes(response.status, response.status === 503 ? 'Third Party Service Unavailable' : '');
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**Request for get all toppings
 *
 * @returns response object
 */
export async function getToppings<T>(): Promise<T> {
  try {
    const response = await instance.get<T>('/toppings');
    checkStatusRes(response.status, response.status === 503 ? 'Third Party Service Unavailable' : '');
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**Request for post new product. This can be only used by admin
 *
 * @param data request body
 * @param config axios request config
 * @returns response object
 */
export async function postProduct<T extends CommonResponse>(
  data: Record<string, any>,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  try {
    return await instance.post<T>('/products', data, config);
  } catch (error) {
    throw error;
  }
}

/**Request for post new topping. This can be only used by admin
 *
 * @param data request body
 * @param config axios request config
 * @returns response object
 */
export async function postTopping<T extends CommonResponse>(
  data: Record<string, any>,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  try {
    return await instance.post<T>('/toppings', data, config);
  } catch (error) {
    throw error;
  }
}

/**Request for update product by admin
 *
 * @param id product to be udpated
 * @param data request body
 * @param config axios request config
 * @returns response object
 */
export async function updateProduct<T extends CommonResponse>(
  id: number,
  data: Record<string, any>,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  try {
    return await instance.put<T>(`/products/${id}`, data, config);
  } catch (error) {
    throw error;
  }
}

/**Request for update topping by admin
 *
 * @param id product to be udpated
 * @param data request body
 * @param config axios request config
 * @returns response object
 */
export async function updateTopping<T extends CommonResponse>(
  id: number,
  data: Record<string, any>,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  try {
    return await instance.put<T>(`/toppings/${id}`, data, config);
  } catch (error) {
    throw error;
  }
}

/**Request for delete product
 *
 * @param id product to be deleted
 * @returns response object
 */
export async function deleteProduct<T extends CommonResponse>(id: number): Promise<AxiosResponse<T>> {
  try {
    return await instance.delete<T>(`/products/${id}`);
  } catch (error) {
    throw error;
  }
}

/**Request for delete topping
 *
 * @param id topping to be deleted
 * @returns response object
 */
export async function deleteTopping<T extends CommonResponse>(id: number): Promise<AxiosResponse<T>> {
  try {
    return await instance.delete<T>(`/toppings/${id}`);
  } catch (error) {
    throw error;
  }
}
