import React, { memo } from 'react';

import { Modal, Paper } from '@/components/atoms';
import type { ModalFormAddressProps } from '@/types';

import { FormAddress } from '../form';

export const ModalFormAddress = memo(function ModalFormAddress({
  isOpen,
  selectedAddress,
  onClose,
  onCreateAddress,
  onUpdateAddress,
}: ModalFormAddressProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Paper
        width="100%"
        maxWidth="24rem"
        transform="translate(-50%, -50%)"
        top="50%"
        left="50%"
        padding={16}
        position="absolute"
        display="flex"
        flexDirection="column"
        alignItems="center">
        <p className="text-3xl mb-4 text-center text-primary">{selectedAddress ? 'Update' : 'New'} Address</p>
        <FormAddress
          isUpdate={selectedAddress ? true : false}
          selectedAddress={selectedAddress}
          onCreate={onCreateAddress}
          onUpdate={onUpdateAddress}
        />
      </Paper>
    </Modal>
  );
});
