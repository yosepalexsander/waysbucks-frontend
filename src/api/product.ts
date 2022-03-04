import { checkStatusRes, instance } from '@/lib/axios';
import type {
  AxiosRequestConfig,
  CommonResponse,
  GetProductResponse,
  GetProductsResponse,
  GetToppingsResponse,
  Product,
  Topping,
} from '@/types';

/**Request for get all products
 *
 * @returns response object
 */
export async function getProducts(): Promise<Product[] | undefined> {
  const response = await instance.get<GetProductsResponse>('products');
  checkStatusRes(response.status, response.status === 503 ? 'Third Party Service Unavailable' : '');
  return response.data.payload;
}

/**Request for get product with corresponding id
 *
 * @param id product id
 * @returns response object
 */
export async function getProduct(id: string): Promise<Product | undefined> {
  try {
    const response = await instance.get<GetProductResponse>(`products/${id}`);
    checkStatusRes(response.status, response.status === 503 ? 'Third Party Service Unavailable' : '');
    return response.data.payload;
  } catch (error) {
    throw error;
  }
}

/**Request for get all toppings
 *
 * @returns response object
 */
export async function getToppings<T extends GetToppingsResponse>(): Promise<Topping[] | undefined> {
  try {
    const response = await instance.get<T>('toppings');
    checkStatusRes(response.status, response.status === 503 ? 'Third Party Service Unavailable' : '');
    return response.data.payload;
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
export async function postProduct<T extends CommonResponse>(data: unknown, config?: AxiosRequestConfig) {
  try {
    await instance.post<T>('products', data, config);
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
export async function postTopping<T extends CommonResponse>(data: unknown, config?: AxiosRequestConfig) {
  try {
    await instance.post<T>('toppings', data, config);
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
export async function updateProduct<T extends CommonResponse>(id: number, data: unknown, config?: AxiosRequestConfig) {
  try {
    await instance.put<T>(`products/${id}`, data, config);
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
export async function updateTopping<T extends CommonResponse>(id: number, data: unknown, config?: AxiosRequestConfig) {
  try {
    await instance.put<T>(`toppings/${id}`, data, config);
  } catch (error) {
    throw error;
  }
}

/**Request for delete product
 *
 * @param id product to be deleted
 * @returns response object
 */
export async function deleteProduct<T extends CommonResponse>(id: number) {
  try {
    await instance.delete<T>(`products/${id}`);
  } catch (error) {
    throw error;
  }
}

/**Request for delete topping
 *
 * @param id topping to be deleted
 * @returns response object
 */
export async function deleteTopping<T extends CommonResponse>(id: number) {
  try {
    await instance.delete<T>(`toppings/${id}`);
  } catch (error) {
    throw error;
  }
}
