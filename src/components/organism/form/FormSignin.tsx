import { Field, Form, Formik } from 'formik';
import React, { useCallback, useState } from 'react';

import { signin } from '@/api';
import { Alert, Button, Input } from '@/components/atoms';
import { useAlert } from '@/hooks/useAlert';
import { SigninSchema } from '@/utils';

interface FormValues {
  email: string;
  password: string;
}

export const FormSignin = () => {
  const { alert, handleCloseAlert, handleOpenAlert } = useAlert();
  const [didFocus, setDidFocus] = useState(false);

  const handleFocus = useCallback(() => {
    setDidFocus(true);
  }, []);

  const handleSubmit = useCallback(
    async (values: FormValues) => {
      const data: Record<string, unknown> = { ...values };

      try {
        await signin(data);
      } catch (error) {
        console.log(error);

        if (error instanceof Error) {
          handleOpenAlert('error', `Error: ${error.message}`);
        }
      }
    },
    [handleOpenAlert],
  );

  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  return (
    <>
      <Alert
        isOpen={alert.isOpen}
        severity={alert.status}
        duration={1000}
        position={{ bottom: 50, right: 50 }}
        onClose={handleCloseAlert}>
        {alert.message}
      </Alert>
      <Formik initialValues={initialValues} validationSchema={SigninSchema} onSubmit={handleSubmit}>
        {({ errors, touched, isValid, values }) => (
          <Form className="form flex flex-col space-y-4">
            <div className="form-group">
              <Field
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                onFocus={handleFocus}
                className={values.email ? 'not-empty' : ''}
                as={Input}
              />
              {(!!didFocus && values.email.trim().length > 2) || (touched.email && errors.email) ? (
                <div aria-live="polite" className="text-sm text-red-600 ml-1">
                  {errors.email}
                </div>
              ) : null}
            </div>
            <div className="form-group">
              <Field
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                onFocus={handleFocus}
                className={values.password ? 'not-empty' : ''}
                as={Input}
              />
              {(!!didFocus && values.password.trim().length > 2) || (touched.password && errors.password) ? (
                <div aria-live="polite" className="text-sm text-red-600 ml-1">
                  {errors.password}
                </div>
              ) : null}
            </div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              isDisabled={isValid ? false : true}
              className="justify-center">
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
