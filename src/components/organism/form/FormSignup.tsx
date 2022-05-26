import type { FormikHelpers } from 'formik';
import { Field, Form, Formik } from 'formik';
import { useCallback, useState } from 'react';

import { register } from '@/api';
import { FemaleIcon, MaleIcon } from '@/assets/icons';
import { Alert, Button, Input } from '@/components/atoms';
import { useAlert } from '@/hooks/useAlert';
import { SignupSchema } from '@/utils';

interface FormValues {
  name: string;
  email: string;
  password: string;
  gender: string;
  phone: string;
}

export const FormSignup = () => {
  const { alert, handleCloseAlert, handleOpenAlert } = useAlert();
  const [didFocus, setDidFocus] = useState(false);

  const handleFocus = useCallback(() => {
    setDidFocus(true);
  }, []);

  const handleSubmit = useCallback(
    async (values: FormValues, _formikHelpers: FormikHelpers<FormValues>) => {
      const data: Record<string, unknown> = { ...values };

      try {
        await register(data);
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
    name: '',
    email: '',
    password: '',
    gender: '',
    phone: '',
  };

  return (
    <>
      <Alert severity="error" isOpen={alert.isOpen} position={{ top: 50 }} onClose={handleCloseAlert}>
        {alert.message}
      </Alert>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={SignupSchema}>
        {({ errors, touched, isValid, values }) => (
          <Form className="form flex flex-col space-y-4">
            <div className="form-group">
              <Field
                id="name"
                name="name"
                placeholder="Username"
                className={values.name ? 'not-empty' : ''}
                as={Input}
                onFocus={handleFocus}
              />
              {(!!didFocus && values.name.trim().length > 2) || (touched.name && errors.name) ? (
                <div aria-live="polite" className="text-sm text-red-600 ml-1">
                  {errors.name}
                </div>
              ) : null}
            </div>
            <div className="form-group">
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                className={values.email ? 'not-empty' : ''}
                onFocus={handleFocus}
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
                type="password"
                placeholder="Password"
                className={values.password ? 'not-empty' : ''}
                onFocus={handleFocus}
                as={Input}
              />
              {(!!didFocus && values.password.trim().length > 2) || (touched.password && errors.password) ? (
                <div aria-live="polite" className="text-sm text-red-600 ml-1">
                  {errors.password}
                </div>
              ) : null}
            </div>
            <div className="form-group">
              <span className="text-gray-700 pl-2 mr-5">{"I'm a... "}</span>
              <label className="checkbox-label" htmlFor="male">
                <Field id="male" type="radio" name="gender" value="male" className="male" />
                <MaleIcon className="icon" size={28} />
                <span>Male</span>
              </label>
              <label className="checkbox-label" htmlFor="female">
                <Field id="female" type="radio" name="gender" value="female" className="female" />
                <FemaleIcon className="icon" size={28} />
                <span>Female</span>
              </label>
            </div>
            <div className="form-group">
              <Field
                id="phone"
                name="phone"
                placeholder="Phone"
                type="tel"
                onFocus={handleFocus}
                as={Input}
                className={values.phone ? 'not-empty' : ''}
              />
              {(!!didFocus && values.phone.trim().length > 2) || (touched.phone && errors.phone) ? (
                <div aria-live="polite" className="text-sm text-red-600 ml-1">
                  {errors.phone}
                </div>
              ) : null}
            </div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              isDisabled={!isValid}
              className="justify-center mt-10">
              Sign up
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
