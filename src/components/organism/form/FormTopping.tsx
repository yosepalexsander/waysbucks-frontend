/* eslint-disable @next/next/no-img-element */
import type { FormikHelpers } from 'formik';
import { Field, Form, Formik } from 'formik';
import { memo, useState } from 'react';

import { postTopping, updateTopping } from '@/api';
import { AttachmentIcon } from '@/assets/icons';
import { Alert, Button, Input } from '@/components/atoms';
import { createJSONRequestConfig } from '@/lib/axios';
import type { Topping } from '@/types';
import { ToppingSchema } from '@/utils/validation';

interface FormValues {
  name: string;
  price: number;
}

interface Props {
  selectedTopping?: Topping;
  isUpdate?: boolean;
  onSubmitSuccess: () => void;
}

export const FormTopping = memo(function FormTopping({ isUpdate, selectedTopping, onSubmitSuccess }: Props) {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>();
  const [image, setImage] = useState<File>();
  const initialValues: FormValues = {
    name: selectedTopping?.name || '',
    price: selectedTopping?.price || 0,
  };

  const [error, setError] = useState({
    isError: false,
    message: '',
  });
  const [showAlert, setShowAlert] = useState(false);
  const [didFocus, setDidFocus] = useState(false);
  const handleFocus = () => setDidFocus(true);

  const onChangeImage = (files: FileList | null) => {
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        setPreview(reader.result);
      };
      setImage(file);
    }
  };
  const handleSubmit = async (values: FormValues, _formikHelpers: FormikHelpers<FormValues>): Promise<any> => {
    const config = createJSONRequestConfig({
      'Content-Type': 'application/json',
    });
    const onResponse = (status: number) => {
      if (status !== 200) {
        setShowAlert(true);
        setError({
          isError: true,
          message: 'Invalid request',
        });
        return;
      }
      onSubmitSuccess();
    };
    try {
      if (image) {
        const body = new FormData();
        body.set('name', values.name);
        body.set('price', `${values.price}`);
        body.set('image', image, image.name);
        const response = isUpdate ? await updateTopping(selectedTopping?.id as number, body) : await postTopping(body);
        onResponse(response.status);
      } else {
        const body: Record<string, any> = { ...values };
        const response = isUpdate
          ? await updateTopping(selectedTopping?.id as number, body, config)
          : await postTopping(body, config);
        onResponse(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {error.isError && (
        <Alert severity="error" isOpen={showAlert} position={{ top: 50 }} onClose={() => setShowAlert(false)}>
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
                <input
                  id="upload"
                  type="file"
                  name="image"
                  hidden
                  accept="image/*"
                  onChange={(e) => onChangeImage(e.target.files)}
                />
                <label htmlFor="upload">
                  Attachment{' '}
                  <span id="file-chosen">
                    <AttachmentIcon size="24" />
                  </span>
                </label>
                {preview ? (
                  <img
                    aria-live="polite"
                    alt="preview"
                    src={preview as string}
                    width={100}
                    height={100}
                    className="mt-5"
                  />
                ) : (
                  <div className="h-15 w-15">
                    {selectedTopping?.image && (
                      <img alt="previous image" src={selectedTopping.image} width={100} height={100} className="mt-5" />
                    )}
                  </div>
                )}
              </div>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!isValid && !image}
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
