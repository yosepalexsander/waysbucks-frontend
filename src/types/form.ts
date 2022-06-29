import type { Product } from './object';

export interface FormAuthLogin {
  email: string;
  password: string;
}

export interface FormAuthSignup {
  name: string;
  email: string;
  password: string;
  gender: string;
  phone: string;
}

export interface FormProduct extends Partial<Product> {
  file?: File;
}
