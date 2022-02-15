import { instance } from '@/lib/axios';
import type { AxiosRequestConfig, AxiosResponse, CommonResponse, TransactionRequest } from '@/types';

/**Request for get user transactions.
 *
 * @returns response object
 */
export async function getUserTransactions<T>(): Promise<T> {
  try {
    return (await instance.get<T>('/user-transactions')).data;
  } catch (error) {
    throw error;
  }
}

/**Request for get all transactions (for admin).
 *
 * @returns response object
 */
export async function getAllTransactions<T>(): Promise<T> {
  try {
    return (await instance.get<T>('/transactions')).data;
  } catch (error) {
    throw error;
  }
}

/**Request for post new transaction by user
 *
 * @param data request body
 * @param config axios request config
 * @returns response object
 */
export async function postTransaction<T extends CommonResponse>(
  data: TransactionRequest,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  try {
    return await instance.post<T>('/transactions', data, config);
  } catch (error) {
    throw error;
  }
}

/**Request for update transaction by user
 *
 * @param id transaction to be udpated
 * @param data request body
 * @param config axios request config
 * @returns response object
 */
export async function updateTransaction<T>(
  id: string,
  data: Record<string, any>,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  try {
    return instance.put<T>(`/transactions/${id}`, data, config);
  } catch (error) {
    throw error;
  }
}
