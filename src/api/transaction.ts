import { instance } from '@/lib/axios';
import type {
  AxiosRequestConfig,
  PostTransactionResponse,
  TransactionRequest,
  UpdateTransactionResponse,
} from '@/types';

/**Request for get user transactions.
 *
 * @returns response object
 */
export async function getUserTransactions<T>(): Promise<T> {
  try {
    return (await instance.get<T>('user-transactions')).data;
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
    return (await instance.get<T>('transactions')).data;
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
export async function postTransaction(
  data: TransactionRequest,
  config?: AxiosRequestConfig,
): Promise<PostTransactionResponse> {
  try {
    return (await instance.post<PostTransactionResponse>('transactions', data, config)).data;
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
export async function updateTransaction(
  id: string,
  data: Partial<TransactionRequest>,
  config?: AxiosRequestConfig,
): Promise<UpdateTransactionResponse> {
  try {
    return (await instance.put<UpdateTransactionResponse>(`transactions/${id}`, data, config)).data;
  } catch (error) {
    throw error;
  }
}
