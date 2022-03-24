import FormData from 'form-data';
import type { FormikHelpers } from 'formik';
import { Field, Form, Formik } from 'formik';
import type { ChangeEvent } from 'react';
import { memo, useCallback, useState } from 'react';

import { postProduct, updateProduct } from '@/api';
import { AttachmentIcon, Delete } from '@/assets/icons';
import { Alert, Button, Input } from '@/components/atoms';
import { useDisclose } from '@/hooks/useDisclose';
import type { Product } from '@/types';
import { getFileExtension } from '@/utils/string';
import { ProductSchema } from '@/utils/validation';

interface FormValues {
  name: string;
  description?: string;
  price: number;
}

interface Props {
  isUpdate?: boolean;
  oldProduct?: Product;
  onSubmitSuccess: () => void;
}

export const FormProduct = memo(({ isUpdate, oldProduct, onSubmitSuccess }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [image, setImage] = useState<File>();
  const [error, setError] = useState({ isError: false, message: '' });
  const [didFocus, setDidFocus] = useState(false);

  const handleFocus = () => setDidFocus(true);

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    setImage(e.target.files[0]);
  };

  const handleRemoveImage = () => {
    setImage(undefined);
  };

  const handleSubmit = useCallback(
    async (values: FormValues, _formikHelpers: FormikHelpers<FormValues>): Promise<void> => {
      try {
        if (image) {
          const body = new FormData();
          body.append('name', values.name);
          body.append('description', values.description as string);
          body.append('price', `${values.price}`);
          body.append('image', image, image.name);

          isUpdate && oldProduct ? await updateProduct(oldProduct?.id as number, body) : await postProduct(body);
        } else {
          const body: Record<string, unknown> = { ...values };

          isUpdate && oldProduct ? await updateProduct(oldProduct.id, body) : await postProduct(body);
        }

        onSubmitSuccess();
      } catch (error) {
        console.log(error);

        if (error instanceof Error) {
          setError({ isError: true, message: `Error: ${error.message}` });
          onOpen();
        }
      }
    },
    [image, isUpdate, oldProduct, onOpen, onSubmitSuccess],
  );

  const initialValues: FormValues = {
    name: oldProduct?.name ?? '',
    description: oldProduct?.description ?? '',
    price: oldProduct?.price ?? 0,
  };

  return (
    <>
      {error.isError && (
        <Alert severity="error" isOpen={isOpen} position={{ top: 50 }} onClose={onClose}>
          {error.message}
        </Alert>
      )}
      <div className="form">
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={ProductSchema}
          onSubmit={handleSubmit}>
          {({ errors, touched, isValid, values }) => (
            <Form>
              <div className="form-group">
                <Field
                  id="name"
                  name="name"
                  label="Name"
                  onFocus={handleFocus}
                  className={values.name ? 'not-empty' : ''}
                  as={Input}
                />
                {(!!didFocus && values.name.trim().length > 2) || touched.name ? (
                  <div aria-live="polite" className="h-3 text-sm text-red-600 ml-1">
                    {errors.name}
                  </div>
                ) : (
                  <div className="h-3"></div>
                )}
              </div>
              <div className="form-group">
                <Field
                  id="description"
                  name="description"
                  label="Description"
                  multiline
                  onFocus={handleFocus}
                  className={values.description ? 'not-empty' : ''}
                  as={Input}
                />
                {!!didFocus || touched.description ? (
                  <div aria-live="polite" className="h-3 text-sm text-red-600 ml-1">
                    {errors.description}
                  </div>
                ) : (
                  <div className="h-3"></div>
                )}
              </div>
              <div className="form-group">
                <Field
                  id="price"
                  name="price"
                  label="Price"
                  type="number"
                  onFocus={handleFocus}
                  className={values.price >= 0 ? 'not-empty' : ''}
                  as={Input}
                />
                {!!didFocus && touched.price ? (
                  <div aria-live="polite" className="h-3 text-sm text-red-600 ml-1">
                    {errors.price}
                  </div>
                ) : (
                  <div className="h-3"></div>
                )}
              </div>
              <div className="form-group">
                <input id="upload" type="file" name="image" hidden accept="image/*" onChange={handleChangeImage} />
                <label htmlFor="upload">
                  Attachment{' '}
                  <span id="file-chosen">
                    <AttachmentIcon size="24" />
                  </span>
                </label>
                {image && (
                  <div className="flex mt-4 justify-between items-center space-x-4">
                    <div className="h6 bg-blue-200 p-1 rounded-md">{getFileExtension(image.name).toUpperCase()}</div>
                    <p className="truncate ...">{image.name}</p>
                    <Button variant="unstyled" type="button" onClick={handleRemoveImage}>
                      <Delete width={24} height={24} />
                    </Button>
                  </div>
                )}
              </div>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!isUpdate && (!isValid || !image)}
                className="w-full mt-2 mb-2">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
});
