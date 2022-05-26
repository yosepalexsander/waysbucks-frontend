import { Form, useFormikContext } from 'formik';
import React, { memo } from 'react';

import { Button, Modal, Paper } from '@/components/atoms';
import { InputField } from '@/components/moleculs';
import type { Address, ModalFormAddressProps } from '@/types';

export const ModalFormAddress = memo(({ isOpen, selectedAddress, onClose }: ModalFormAddressProps) => {
  const { isValid, isSubmitting } = useFormikContext<Partial<Address>>();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Paper
        width="100%"
        maxWidth="24rem"
        padding={16}
        display="flex"
        flexDirection="column"
        alignItems="center"
        position="absolute"
        transform="translate(-50%, -50%)"
        top="50%"
        left="50%">
        <p className="text-3xl mb-10 text-center text-primary">{selectedAddress ? 'Update' : 'New'} Address</p>
        <Form className="form flex-col space-y-4">
          <InputField name="name" placeholder="name" />
          <InputField name="phone" placeholder="phone" />
          <InputField name="address" placeholder="full address" />
          <InputField name="city" placeholder="city" />
          <InputField name="postal_code" placeholder="postal code" type="number" />
          <Button
            variant="contained"
            color="primary"
            isDisabled={!selectedAddress && !isValid}
            isLoading={isSubmitting}
            type="submit"
            className="w-full mt-2 mb-2">
            Submit
          </Button>
        </Form>
      </Paper>
    </Modal>
  );
});
