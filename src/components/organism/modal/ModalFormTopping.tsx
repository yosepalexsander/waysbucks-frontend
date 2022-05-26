import { Form, useFormikContext } from 'formik';
import React, { memo } from 'react';

import { Button, Modal, Paper } from '@/components/atoms';
import { InputField } from '@/components/moleculs';
import { InputAttachment } from '@/components/moleculs/InputAttachment';
import type { FormProduct, ModalFormToppingProps } from '@/types';

export const ModalFormTopping = memo(({ isOpen, selectedTopping, onAttachFile, onClose }: ModalFormToppingProps) => {
  const { isValid, isSubmitting, values } = useFormikContext<FormProduct>();

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
        <p className="text-3xl mb-10 text-center text-primary">{selectedTopping ? 'Update' : 'New'} Topping</p>
        <Form className="form flex-col space-y-4">
          <InputField name="name" placeholder="name" />
          <InputField name="price" placeholder="price" type="number" />
          <InputAttachment name="file" onAttachFile={onAttachFile} />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            isDisabled={!selectedTopping && (!isValid || !values.file)}
            isLoading={isSubmitting}
            className="w-full mt-2 mb-2">
            Submit
          </Button>
        </Form>
      </Paper>
    </Modal>
  );
});
