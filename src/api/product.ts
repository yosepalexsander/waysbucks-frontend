import { checkStatusRes, instance } from '@/lib/axios';
import type {
  CommonResponse,
  GetProductResponse,
  GetProductsResponse,
  GetToppingsResponse,
  Product,
  Topping,
} from '@/types';

export async function getProducts(): Promise<Product[] | undefined> {
  const response = await instance.get<GetProductsResponse>('products');
  checkStatusRes(response.status, response.status === 503 ? 'Third Party Service Unavailable' : '');
  return response.data.payload;
}

export async function getProduct(id: string): Promise<Product | undefined> {
  try {
    const response = await instance.get<GetProductResponse>(`products/${id}`);
    checkStatusRes(response.status, response.status === 503 ? 'Third Party Service Unavailable' : '');
    return response.data.payload;
  } catch (error) {
    throw error;
  }
}

export async function getToppings(): Promise<Topping[] | undefined> {
  try {
    const response = await instance.get<GetToppingsResponse>('toppings');
    checkStatusRes(response.status, response.status === 503 ? 'Third Party Service Unavailable' : '');
    return response.data.payload;
  } catch (error) {
    throw error;
  }
}

export async function postProduct(data: Partial<Product>) {
  try {
    await instance.post<CommonResponse>('products', data);
  } catch (error) {
    throw error;
  }
}

export async function postTopping(data: unknown) {
  try {
    await instance.post<CommonResponse>('toppings', data);
  } catch (error) {
    throw error;
  }
}

export async function updateProduct(id: number, data: Partial<Product>) {
  try {
    await instance.put<CommonResponse>(`products/${id}`, data);
  } catch (error) {
    throw error;
  }
}

export async function updateTopping(id: number, data: unknown) {
  try {
    await instance.put<CommonResponse>(`toppings/${id}`, data);
  } catch (error) {
    throw error;
  }
}

export async function deleteProduct(id: number) {
  try {
    await instance.delete<CommonResponse>(`products/${id}`);
  } catch (error) {
    throw error;
  }
}

export async function deleteTopping(id: number) {
  try {
    await instance.delete<CommonResponse>(`toppings/${id}`);
  } catch (error) {
    throw error;
  }
}
