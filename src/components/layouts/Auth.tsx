import Head from 'next/head';
import type { ReactNode } from 'react';
import { memo } from 'react';

interface Props {
  head: {
    title?: string;
    description?: string;
  };
  children: ReactNode;
}

export const Layout = memo(({ head, children }: Props) => {
  return (
    <>
      <Head>
        {head.description && <meta name="description" content={head.description} key="description" />}
        <title>{`${head.title} - Waysbucks`}</title>
      </Head>
      <main className="screen-center bg-gray-300">{children}</main>
    </>
  );
});
