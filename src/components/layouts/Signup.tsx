import Head from 'next/head';
import type { ReactNode } from 'react';
import { memo } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = memo(({ children }: LayoutProps) => {
  return (
    <div>
      <Head>
        <meta
          name="description"
          content="Sign up for amazing way to coffee discovery with Waysbucks"
          key="description"
        />
        <title>Sign Up - Waysbucks Coffee</title>
      </Head>
      <main className="screen-center bg-gray-300">{children}</main>
    </div>
  );
});
