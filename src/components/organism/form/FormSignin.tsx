import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';

import { signin } from '@/api';
import { Alert, Button, Input } from '@/components/atoms';
import { useDisclose } from '@/hooks/useDisclose';
import { SigninSchema } from '@/utils';

interface FormValues {
  email: string;
  password: string;
}

export const FormSignin = () => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [error, setError] = useState({ isError: false, message: '' });
  const [didFocus, setDidFocus] = useState(false);

  const handleFocus = () => setDidFocus(true);

  const handleSubmit = async (values: FormValues): Promise<void> => {
    const data: Record<string, unknown> = { ...values };

    try {
      await signin(data);
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        setError({ isError: true, message: `Error: ${error.message}` });
        onOpen();
      }
    }
  };

  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  return (
    <>
      {error.isError && (
        <Alert severity="error" isOpen={isOpen} position={{ bottom: 50, right: 50 }} onClose={onClose}>
          {error.message}
        </Alert>
      )}
      <div className="form">
        <Formik initialValues={initialValues} validationSchema={SigninSchema} onSubmit={handleSubmit}>
          {({ errors, touched, isValid, values }) => (
            <Form>
              <div className="form-group">
                <Field
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  onFocus={handleFocus}
                  className={values.email ? 'not-empty' : ''}
                  as={Input}
                />
                {(!!didFocus && values.email.trim().length > 2) || touched.email ? (
                  <div aria-live="polite" className="h-3 text-sm text-red-600 ml-1">
                    {errors.email}
                  </div>
                ) : (
                  <div className="h-3"></div>
                )}
              </div>
              <div className="form-group">
                <Field
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  onFocus={handleFocus}
                  className={values.password ? 'not-empty' : ''}
                  as={Input}
                />
                {(!!didFocus && values.password.trim().length > 2) || touched.password ? (
                  <div aria-live="polite" className="h-3 text-sm text-red-600 ml-1">
                    {errors.password}
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
                className="h-full w-full mt-4 mb-2">
                Sign In
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
