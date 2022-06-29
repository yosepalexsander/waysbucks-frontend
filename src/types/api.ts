import type { Address, Cart, Product, Topping, Transaction, User } from './object';

export type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface CommonResponse {
  error: boolean;
  message: string;
}

export interface AuthResponse extends CommonResponse {
  payload: {
    name: string;
    email: string;
    token: string;
  };
}

export interface GetUserResponse extends CommonResponse {
  payload?: User;
}

export interface GetAddressResponse extends CommonResponse {
  payload: Address[];
}

export interface GetProductsResponse extends CommonResponse {
  payload: Product[];
}

export interface GetProductResponse extends CommonResponse {
  payload: Product;
}

export interface GetToppingsResponse extends CommonResponse {
  payload: Topping[];
}

export interface PostCartRequest {
  product_id: number;
  topping_id: number[];
  qty: number;
  price: number;
}

export interface GetCartsResponse extends CommonResponse {
  payload: Cart[];
}

export interface GetAddressResponse extends CommonResponse {
  payload: Address[];
}

export interface OrderRequest {
  product_id: number;
  topping_id: number[];
  qty: number;
  price: number;
}
export interface TransactionRequest {
  name: string;
  email: string;
  address: string;
  postal_code: number;
  phone: string;
  city: string;
  status: string;
  total: number;
  service_fee: number;
  orders: OrderRequest[];
}

export interface GetTransactionsResponse extends CommonResponse {
  payload: Transaction[];
}

export interface PostTransactionResponse extends CommonResponse {
  payload: {
    token: string;
    redirect_url: string;
  };
}

export interface PostImageResponse extends CommonResponse {
  payload: {
    filename: string;
    url: string;
  };
}

export interface RequestError extends Error {
  status: number;
}

export interface Token {
  token: string | null;
}

export interface GoogleCredentialResponse {
  client_id?: string;
  credential?: string;
  select_by?:
    | 'auto'
    | 'user'
    | 'user_1tap'
    | 'user_2tap'
    | 'btn'
    | 'btn_confirm'
    | 'btn_add_session'
    | 'btn_confirm_add_session';
}
