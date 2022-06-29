import { Field, Form, FormikProvider } from 'formik';
import Image from 'next/image';
import Link from 'next/link';

import { BrandLogo, FemaleIcon, MaleIcon } from '@/assets/icons';
import { Login } from '@/assets/images';
import { Alert, Button } from '@/components/atoms';
import { Layout } from '@/components/layouts/Auth';
import { InputField } from '@/components/moleculs';
import { useAuth } from '@/hooks/useAuth';

// eslint-disable-next-line import/no-default-export
export default function SignupPage() {
  const { alert, formSignupProps, handleCloseAlert } = useAuth();

  return (
    <Layout head={{ title: 'Login', description: 'Welcome back to Waysbucks coffee' }}>
      <section id="signup" className="auth">
        <div className="auth-img">
          <Image
            src={Login}
            alt="coffee addict"
            width={100}
            height={100}
            layout="responsive"
            objectFit="cover"
            priority
          />
        </div>
        <div className="form-container">
          <div className="mb-6 text-center">
            <BrandLogo title="Brand Logo" titleId="logo" width={70} height={70} />
            <h1 className="text-2xl font-medium">For Coffee Connoisseur</h1>
          </div>
          <FormikProvider value={formSignupProps}>
            <Form className="form flex flex-col space-y-2">
              <InputField name="name" placeholder="e.g. john doe" />
              <InputField name="email" placeholder="e.g. johndoe@gmail.com" type="email" />
              <InputField name="password" placeholder="password" type="password" />
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
              <InputField name="phone" placeholder="phone" type="tel" />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                isDisabled={!formSignupProps.isValid}
                className="justify-center mt-10">
                Sign up
              </Button>
            </Form>
          </FormikProvider>
          <p>or</p>
          <div id="gsi" />
          <p className="mt-2 text-center text-sm lg:text-base">
            Already have an account?{' '}
            <Link href="/login">
              <a className="text-blue-600">Login</a>
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
    </Layout>
  );
}
