import type { FormikHelpers } from 'formik';
import { Field, Form, Formik } from 'formik';
import { memo, useCallback, useState } from 'react';

import { Alert, Button, Input } from '@/components/atoms';
import { useDisclose } from '@/hooks/useDisclose';
import type { Address } from '@/types';
import { AddressSchema } from '@/utils/validation';

interface FormValues {
  name: string;
  phone: string;
  address: string;
  city: string;
  postal_code: number;
}

interface Props {
  isUpdate?: boolean;
  selectedAddress?: Address;
  onCreate: (address: Partial<Address>) => void;
  onUpdate: (id: string, address: Partial<Address>) => void;
}

export const FormAddress = memo(function FormAddress({ isUpdate, selectedAddress, onCreate, onUpdate }: Props) {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [error, setError] = useState({ isError: false, message: '' });
  const [didFocus, setDidFocus] = useState(false);

  const handleFocus = () => setDidFocus(true);

  const handleSubmit = useCallback(
    async (values: FormValues, _formikHelpers: FormikHelpers<FormValues>): Promise<void> => {
      const address = { ...values };

      try {
        isUpdate && selectedAddress ? onUpdate(selectedAddress.id, address) : onCreate(address);
      } catch (error) {
        console.log(error);

        if (error instanceof Error) {
          setError({ isError: true, message: `Error: ${error.message}` });
          onOpen();
        }
      }
    },
    [isUpdate, onCreate, onOpen, onUpdate, selectedAddress],
  );

  const initialValues: FormValues = {
    name: selectedAddress?.name ?? '',
    phone: selectedAddress?.phone ?? '',
    address: selectedAddress?.address ?? '',
    city: selectedAddress?.city ?? '',
    postal_code: selectedAddress?.postal_code ?? 0,
  };

  return (
    <>
      <Alert isOpen={isOpen} severity="error" position={{ top: 50 }} onClose={onClose}>
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
