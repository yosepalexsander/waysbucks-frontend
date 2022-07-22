import { Form, useFormikContext } from 'formik';
import React, { memo } from 'react';

import { Button, Modal, Paper } from '@/components/atoms';
import { InputField } from '@/components/moleculs';
import { InputAttachment } from '@/components/moleculs/InputAttachment';
import type { FormProduct, ModalFormProductProps } from '@/types';

export const ModalFormProduct = memo(({ isOpen, selectedProduct, onAttachFile, onClose }: ModalFormProductProps) => {
  const { isValid, isSubmitting, values } = useFormikContext<FormProduct>();

  console.log(values.image);

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
        <p className="mb-10 text-center text-3xl text-primary">{selectedProduct ? 'Update' : 'New'} Product</p>
        <Form className="form flex-col space-y-4">
          <InputField name="name" placeholder="name" />
          <InputField name="description" placeholder="description" multiline />
          <InputField name="price" type="number" placeholder="price" />
          <InputAttachment name="file" onAttachFile={onAttachFile} />
          <Button
            type="submit"
            isDisabled={!selectedProduct && (!isValid || !values.file)}
            isLoading={isSubmitting}
            className="mt-2 mb-2 w-full">
            Submit
          </Button>
        </Form>
      </Paper>
    </Modal>
  );
});
