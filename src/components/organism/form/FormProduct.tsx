/* eslint-disable @next/next/no-img-element */
import type { FormikHelpers } from 'formik';
import { Field, Form, Formik } from 'formik';
import { memo, useState } from 'react';

import { postProduct, updateProduct } from '@/api';
import { AttachmentIcon } from '@/assets/icons';
import { Alert, Button, Input } from '@/components/atoms';
import { createJSONRequestConfig } from '@/lib/axios';
import type { Product } from '@/types';
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

export const FormProduct = memo(function FormProduct({ isUpdate, oldProduct, onSubmitSuccess }: Props) {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>();
  const [image, setImage] = useState<File>();
  const initialValues: FormValues = {
    name: oldProduct?.name ?? '',
    description: oldProduct?.description ?? '',
    price: oldProduct?.price ?? 0,
  };

  // for handle notify error post address
  const [error, setError] = useState({
    isError: false,
    message: '',
  });
  // handle show alert
  const [showAlert, setShowAlert] = useState(false);

  // for live feedback from formik
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
    const config = createJSONRequestConfig();
    const onResponse = (status: number) => {
      if (status !== 200) {
        setShowAlert(true);
        setError({
          isError: true,
          message: 'Invalid request',
        });
        return;
      }
    };
    try {
      if (image) {
        const body = new FormData();
        body.set('name', values.name);
        body.set('description', values.description as string);
        body.set('price', `${values.price}`);
        body.set('image', image, image.name);
        const response = isUpdate ? await updateProduct(oldProduct?.id as number, body) : await postProduct(body);
        onResponse(response.status);
      } else {
        const body: Record<string, any> = { ...values };
        const response = isUpdate
          ? await updateProduct(oldProduct?.id as number, body, config)
          : await postProduct(body, config);
        onResponse(response.status);
      }
      onSubmitSuccess();
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
                    {oldProduct?.image && (
                      <img alt="previous image" src={oldProduct.image} width={100} height={100} className="mt-5" />
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
