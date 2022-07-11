import { Form, useFormikContext } from 'formik';
import { memo } from 'react';

import { AddLocationIcon } from '@/assets/icons';
import { Button, Modal, Paper } from '@/components/atoms';
import { InputField } from '@/components/moleculs';
import type { Address, ModalFormAddressProps } from '@/types';

export const ModalFormAddress = memo(({ isOpen, selectedAddress, onClose, onOpenMap }: ModalFormAddressProps) => {
  const { errors, isValid, isSubmitting } = useFormikContext<Partial<Address>>();

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
        <p className="mb-10 text-center text-3xl text-primary">{selectedAddress ? 'Update' : 'New'} Address</p>
        <Form className="form flex-col space-y-4">
          <InputField name="name" placeholder="name" />
          <InputField name="phone" placeholder="phone" />
          <InputField name="address" placeholder="full address" />
          <InputField name="city" placeholder="city" />
          <InputField name="postal_code" placeholder="postal code" type="number" />
          <div className="form-group">
            <Button size="sm" type="button" leftIcon={<AddLocationIcon size="1.25rem" />} onClick={onOpenMap}>
              Pin location
            </Button>
            {errors.longitude || errors.latitude ? (
              <div aria-live="polite" className="ml-1 h-3 text-sm text-red-600">
                Please pin your address location
              </div>
            ) : (
              <div className="h-3" />
            )}
          </div>
          <Button
            isDisabled={!selectedAddress && !isValid}
            isLoading={isSubmitting}
            type="submit"
            className="mt-2 mb-2 w-full">
            Submit
          </Button>
        </Form>
      </Paper>
    </Modal>
  );
});
