import Head from 'next/head';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <div>
      <Head>
        <meta name="description" content="Welcome back to Waysbucks coffee" key="description" />
      </Head>
      <main className="screen-center bg-gray-300">{children}</main>
    </div>
  );
}
