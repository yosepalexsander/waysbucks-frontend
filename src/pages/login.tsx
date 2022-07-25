import { Form, FormikProvider } from 'formik';
import Image from 'next/image';
import Link from 'next/link';

import { BrandLogo } from '@/assets/icons';
import { Login } from '@/assets/images';
import { Alert, Button } from '@/components/atoms';
import { Layout } from '@/components/layouts/Auth';
import { InputField } from '@/components/moleculs';
import { GSILoader } from '@/components/scripts/GSILoader';
import { useAuth } from '@/hooks/useAuth';

// eslint-disable-next-line import/no-default-export
export default function LoginPage() {
  const { alert, formLoginProps, handleCloseAlert } = useAuth();

  return (
    <Layout head={{ title: 'Login', description: 'Welcome back to Waysbucks coffee' }}>
      <section id="login" className="auth">
        <div className="auth-img">
          <Image src={Login} alt="coffee addict" width={100} height={100} layout="responsive" objectFit="cover" />
        </div>
        <div className="form-container">
          <div className="mb-6 text-center">
            <BrandLogo title="Brand Logo" titleId="logo" width={70} height={70} />
            <h1 className="text-2xl font-medium">Welcome Back!</h1>
          </div>
          <FormikProvider value={formLoginProps}>
            <Form className="form flex flex-col space-y-2">
              <InputField name="email" placeholder="email" />
              <InputField name="password" placeholder="password" type="password" />
              <Button type="submit" isDisabled={!formLoginProps.isValid} className="justify-center">
                Login
              </Button>
            </Form>
          </FormikProvider>
          <p>or</p>
          <div id="gsi" />
          <p className="mt-2 text-center text-sm lg:text-base">
            Don&apos;t have an account yet? Please{' '}
            <Link href="/signup">
              <a className="text-blue-600">Sign up</a>
            </Link>
          </p>
        </div>
      </section>
      <Alert
        isOpen={alert.isOpen}
        severity={alert.status}
        duration={1000}
        position={{ bottom: 50, right: 50 }}
        onClose={handleCloseAlert}>
        {alert.message}
      </Alert>
      <GSILoader />
    </Layout>
  );
}
