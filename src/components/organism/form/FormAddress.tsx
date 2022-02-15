import type { FormikHelpers } from 'formik';
import { Field, Form, Formik } from 'formik';
import { memo, useState } from 'react';

import { createAddress, updateAddress } from '@/api';
import { Alert, Button, Input } from '@/components/atoms';
import { createJSONRequestConfig } from '@/lib/axios';
import type { Address } from '@/types';
import { AddressSchema } from '@/utils/validation';

interface FormValues {
  name: string;
  address: string;
  phone: string;
  postal_code: number;
  city: string;
}

interface Props {
  isUpdate?: boolean;
  oldAddress?: Address;
  onSubmitSuccess: () => void;
}

export const FormAddress = memo(function FormAddress({ isUpdate, oldAddress, onSubmitSuccess }: Props) {
  const initialValues: FormValues = {
    name: oldAddress?.name || '',
    address: oldAddress?.address || '',
    phone: oldAddress?.phone || '',
    postal_code: oldAddress?.postal_code || 0,
    city: oldAddress?.city || '',
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

  const handleSubmit = async (values: FormValues, _formikHelpers: FormikHelpers<FormValues>): Promise<any> => {
    const config = createJSONRequestConfig();

    const body: Record<string, any> = { ...values };
    try {
      isUpdate ? await updateAddress(oldAddress?.id as number, body, config) : await createAddress(body, config);
      onSubmitSuccess();
    } catch (error) {
      setShowAlert(true);
      setError({
        isError: true,
        message: 'Failed to add new Address',
      });
      return;
    }
  };

  return (
    <>
      <Alert severity="error" isOpen={showAlert} position={{ top: 50 }} onClose={() => setShowAlert(false)}>
        {error.message}
      </Alert>
      <div className="form">
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={AddressSchema}
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
                  id="address"
                  name="address"
                  label="Address"
                  onFocus={handleFocus}
                  className={values.address ? 'not-empty' : ''}
                  as={Input}
                />
                {(!!didFocus && values.address.trim().length > 2) || touched.address ? (
                  <div aria-live="polite" className="h-3 text-sm text-red-600 ml-1">
                    {errors.address}
                  </div>
                ) : (
                  <div className="h-3"></div>
                )}
              </div>
              <div className="form-group">
                <Field
                  id="postal_code"
                  name="postal_code"
                  label="Postal Code"
                  type="number"
                  onFocus={handleFocus}
                  className={values.postal_code >= 0 ? 'not-empty' : ''}
                  as={Input}
                />
                {!!didFocus && touched.postal_code ? (
                  <div aria-live="polite" className="h-3 text-sm text-red-600 ml-1">
                    {errors.postal_code}
                  </div>
                ) : (
                  <div className="h-3"></div>
                )}
              </div>
              <div className="form-group">
                <Field
                  id="phone"
                  name="phone"
                  label="Phone"
                  onFocus={handleFocus}
                  className={values.phone ? 'not-empty' : ''}
                  as={Input}
                />
                {(!!didFocus && values.phone.trim().length > 2) || touched.phone ? (
                  <div aria-live="polite" className="h-3 text-sm text-red-600 ml-1">
                    {errors.phone}
                  </div>
                ) : (
                  <div className="h-3"></div>
                )}
              </div>
              <div className="form-group">
                <Field
                  id="city"
                  name="city"
                  label="City"
                  onFocus={handleFocus}
                  className={values.city ? 'not-empty' : ''}
                  as={Input}
                />
                {(!!didFocus && values.city.trim().length > 2) || touched.city ? (
                  <div aria-live="polite" className="h-3 text-sm text-red-600 ml-1">
                    {errors.city}
                  </div>
                ) : (
                  <div className="h-3"></div>
                )}
              </div>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isValid ? false : true}
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
