import { instance } from '@/lib/axios';
import type {
  AxiosRequestConfig,
  CommonResponse,
  GetTransactionsResponse,
  PostTransactionResponse,
  Transaction,
  TransactionRequest,
} from '@/types';

export async function getUserTransactions(): Promise<Transaction[] | undefined> {
  try {
    return (await instance.get<GetTransactionsResponse>('user-transactions')).data.payload;
  } catch (error) {
    throw error;
  }
}

export async function getAllTransactions(): Promise<Transaction[] | undefined> {
  try {
    return (await instance.get<GetTransactionsResponse>('transactions')).data.payload;
  } catch (error) {
    throw error;
  }
}

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

export async function updateTransaction(id: string, data: Partial<TransactionRequest>, config?: AxiosRequestConfig) {
  try {
    await instance.put<CommonResponse>(`transactions/${id}`, data, config);
  } catch (error) {
    throw error;
  }
}
