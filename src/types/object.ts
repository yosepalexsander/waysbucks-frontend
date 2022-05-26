export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  image: string;
  is_admin: boolean;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  postal_code: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  is_available: boolean;
}

export interface Topping {
  id: number;
  name: string;
  image: string;
  price: number;
  is_available: boolean;
}

export interface Cart {
  id: number;
  price: number;
  qty: number;
  product: Product;
  toppings: Topping[];
}

export interface Order {
  id: string;
  price: string;
  qty: number;
  name: string;
  image: string;
  toppings: Topping[];
}

export interface Transaction {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  postal_code: number;
  total: number;
  service_fee: number;
  status: number;
  orders: Order[];
}

export interface AlertState {
  isOpen: boolean;
  status?: 'success' | 'warning' | 'error' | 'info';
  message: string;
}
