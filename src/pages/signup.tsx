import Image from 'next/image';
import Link from 'next/link';

import { BrandLogo } from '@/assets/icons';
import { Login } from '@/assets/images';
import { Layout } from '@/components/layouts/Signup';
import { FormSignup } from '@/components/organism/form';

// eslint-disable-next-line import/no-default-export
export default function SignupPage() {
  return (
    <Layout>
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
          <FormSignup />
          <p className="text-center text-sm lg:text-base">
            Already have an account?{' '}
            <Link href="/signin">
              <a className="text-blue-600">Sign in</a>
            </Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
