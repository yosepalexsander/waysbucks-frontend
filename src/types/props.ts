import type { ReactNode } from 'react';

import type { Address } from './object';

interface ModalProps {
  isOpen: boolean;
  children?: ReactNode;
  onClose: () => void;
}

export interface ModalFormAddressProps extends ModalProps {
  selectedAddress?: Address;
  onUpdateAddress: () => void;
}
