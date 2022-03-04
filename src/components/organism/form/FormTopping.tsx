/* eslint-disable @next/next/no-img-element */
import FormData from 'form-data';
import type { FormikHelpers } from 'formik';
import { Field, Form, Formik } from 'formik';
import type { ChangeEvent } from 'react';
import { memo, useCallback, useState } from 'react';

import { postTopping, updateTopping } from '@/api';
import { AttachmentIcon, Delete } from '@/assets/icons';
import { Alert, Button, Input } from '@/components/atoms';
import { useDisclose } from '@/hooks/useDisclose';
import { createJSONRequestConfig } from '@/lib/axios';
import type { Topping } from '@/types';
import { getFileExtension } from '@/utils/string';
import { ToppingSchema } from '@/utils/validation';

interface FormValues {
  name: string;
  price: number;
}

interface Props {
  isUpdate?: boolean;
  selectedTopping?: Topping;
  onSubmitSuccess: () => void;
}

export const FormTopping = memo(function FormTopping({ isUpdate, selectedTopping, onSubmitSuccess }: Props) {
  const [image, setImage] = useState<File>();
  const { isOpen, onOpen, onClose } = useDisclose();
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
      const config = createJSONRequestConfig();

      try {
        if (image) {
          const body = new FormData();
          body.append('name', values.name);
          body.append('price', `${values.price}`);
          body.append('image', image, image.name);
          isUpdate && selectedTopping ? await updateTopping(selectedTopping.id, body) : await postTopping(body);

          onSubmitSuccess();
        } else {
          const body = { ...values };
          isUpdate && selectedTopping
            ? await updateTopping(selectedTopping.id, body, config)
            : await postTopping(body, config);

          onSubmitSuccess();
        }
      } catch (error) {
        console.log(error);

        if (error instanceof Error) {
          setError({ isError: true, message: `Error: ${error.message}` });
          onOpen();
        }
      }
    },
    [image, isUpdate, onOpen, onSubmitSuccess, selectedTopping],
  );

  const initialValues: FormValues = {
    name: selectedTopping?.name ?? '',
    price: selectedTopping?.price ?? 0,
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
          validationSchema={ToppingSchema}
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
