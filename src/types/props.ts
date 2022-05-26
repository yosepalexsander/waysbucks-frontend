import type { ReactNode } from 'react';

import type { Address, Product, Topping } from './object';

interface ModalProps {
  isOpen: boolean;
  children?: ReactNode;
  onClose: () => void;
}

export interface ModalFormAddressProps extends ModalProps {
  selectedAddress?: Address;
  onCreateAddress: (body: Partial<Address>) => void;
  onUpdateAddress: (id: string, body: Partial<Address>) => void;
}

export interface ModalFormProductProps extends ModalProps {
  selectedProduct?: Product;
  onAttachFile: (file?: File) => void;
}

export interface ModalFormToppingProps extends ModalProps {
  selectedTopping?: Topping;
  onAttachFile: (file?: File) => void;
}

export interface FormProduct extends Partial<Product> {
  file?: File;
}
