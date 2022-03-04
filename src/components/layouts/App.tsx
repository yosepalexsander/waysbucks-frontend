import Head from 'next/head';
import type { ReactElement, ReactNode } from 'react';
import { memo } from 'react';

interface Props {
  children?: ReactNode;
  head: {
    title?: string;
    description?: string;
    extScript?: ReactElement<HTMLScriptElement>;
  };
}

export const Layout = memo(function Layout({ children, head }: Props) {
  return (
    <>
      <Head>
        <title>{head.title}</title>
        {head.description && <meta name="description" content={head.description} key="description" />}
        {head.extScript}
      </Head>
      {children}
    </>
  );
});
