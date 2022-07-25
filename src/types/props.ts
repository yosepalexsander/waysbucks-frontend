import type { ReactNode } from 'react';

import type { Address, Product, Topping } from './object';

interface ModalProps {
  isOpen: boolean;
  children?: ReactNode;
  onClose: () => void;
}

export interface ModalFormAddressProps extends ModalProps {
  selectedAddress?: Address;
  onOpenMap: () => void;
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

export interface ModalMapProps extends ModalProps {
  onSelectLocation: (lng: number, lat: number) => void;
}
