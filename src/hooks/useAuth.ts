import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

import { login, loginWithGoogle, register } from '@/api';
import type { FormAuthLogin, FormAuthSignup, FormikHelpers, GoogleCredentialResponse } from '@/types';
import { LoginSchema, SignupSchema } from '@/utils';

import { useAlert } from './useAlert';

export const useAuth = () => {
  const router = useRouter();
  const { alert, handleCloseAlert, handleOpenAlert } = useAlert();

  const handleGSI = useCallback(() => {
    // @ts-ignore
    const { google } = window;

    if (!google) {
      return;
    }

    google.accounts.id.renderButton(document.getElementById('gsi'), {
      type: 'standard',
      shape: 'rectangular',
      theme: 'outline',
      text: 'continue_with',
      size: 'large',
      logo_alignment: 'left',
      alignment: 'center',
      width: '300',
      height: '40',
    });
    google.accounts.id.prompt();
  }, []);

  useEffect(() => {
    handleGSI();
  }, [handleGSI]);

  const handleLoginWithGoogle = useCallback(async (res: GoogleCredentialResponse) => {
    try {
      if (!res.credential) {
        throw new Error('Google credential is empty');
      }

      await loginWithGoogle({ token: res.credential });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleOnLoad = useCallback(() => {
    // @ts-ignore
    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: handleLoginWithGoogle,
      context: router.pathname,
    });
    handleGSI();
  }, [handleGSI, handleLoginWithGoogle, router.pathname]);

  const handleSubmitLogin = useCallback(
    async (values: FormAuthLogin) => {
      const data: Record<string, unknown> = { ...values };

      try {
        await login(data);
      } catch (error) {
        console.log(error);

        if (error instanceof Error) {
          handleOpenAlert('error', `Error: ${error.message}`);
        }
      }
    },
    [handleOpenAlert],
  );

  const formLoginProps = useFormik<FormAuthLogin>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: handleSubmitLogin,
  });

  const handleSubmitSignup = useCallback(
    async (values: FormAuthSignup, _formikHelpers: FormikHelpers<FormAuthSignup>) => {
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

  const formSignupProps = useFormik<FormAuthSignup>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      gender: '',
      phone: '',
    },
    validationSchema: SignupSchema,
    onSubmit: handleSubmitSignup,
  });

  return {
    alert,
    formLoginProps,
    formSignupProps,
    handleCloseAlert,
    handleOnLoad,
  };
};
