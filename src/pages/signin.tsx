import Image from 'next/image';
import Link from 'next/link';

import { BrandLogo } from '@/assets/icons';
import { Login } from '@/assets/images';
import { Layout } from '@/components/layouts/Signin';
import { FormSignin } from '@/components/organism/form';

// eslint-disable-next-line import/no-default-export
export default function SigninPage() {
  return (
    <Layout>
      <section id="signin" className="auth">
        <div className="auth-img">
          <Image src={Login} alt="coffee addict" width={100} height={100} layout="responsive" objectFit="cover" />
        </div>
        <div className="form-container">
          <div className="mb-6 text-center">
            <BrandLogo title="Brand Logo" titleId="logo" width={70} height={70} />
            <h1 className="text-2xl font-medium">Welcome Back!</h1>
          </div>
          <FormSignin />
          <p className="mt-2 text-center text-sm lg:text-base">
            Don&apos;t have an account yet? Please{' '}
            <Link href="/signup">
              <a className="text-blue-600">Sign up</a>
            </Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
