import type { FormikHelpers } from 'formik';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';

import { register } from '@/api';
import { FemaleIcon, MaleIcon } from '@/assets/icons';
import { Alert, Button, Input } from '@/components/atoms';
import { createJSONRequestConfig } from '@/lib/axios';
import type { SignupResponse } from '@/types';
import { SignupSchema } from '@/utils';

interface FormValues {
  name: string;
  email: string;
  password: string;
  gender: string;
  phone: string;
}

export const FormSignup = () => {
  const initialValues: FormValues = {
    name: '',
    email: '',
    password: '',
    gender: '',
    phone: '',
  };

  // for handle registration reply
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

    try {
      await register<SignupResponse>(values, config);
    } catch (error) {
      setError({
        isError: true,
        message: 'Email has already registered',
      });
    } finally {
      setShowAlert(true);
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
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={SignupSchema}>
          {({ errors, touched, isValid, values }) => (
            <Form>
              <div className="form-group">
                <Field
                  id="name"
                  name="name"
                  label="Username"
                  onFocus={handleFocus}
                  className={values.name ? 'not-empty' : ''}
                  as={Input}
                />
                {(!!didFocus && values.name.trim().length > 2) || (touched.name && errors.name) ? (
                  <div aria-live="polite" className="h-3 text-sm text-red-600 ml-1">
                    {errors.name}
                  </div>
                ) : (
                  <div className="h-3"></div>
                )}
              </div>
              <div className="form-group">
                <Field
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
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
                  type="password"
                  label="Password"
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
                  label="Phone"
                  onFocus={handleFocus}
                  type="tel"
                  as={Input}
                  className={values.phone ? 'not-empty' : ''}
                />
                {(!!didFocus && values.phone.trim().length > 2) || touched.phone ? (
                  <div aria-live="polite" className="h-3 text-sm text-red-600 ml-1">
                    {errors.phone}
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
};
