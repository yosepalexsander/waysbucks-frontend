import Head from 'next/head';
import type { ReactElement, ReactNode } from 'react';
import { memo } from 'react';

import { Footer, HeaderBar } from '@/components/organism/partial';
import type { User } from '@/types';

interface Props {
  children?: ReactNode;
  route: string;
  user?: User | null;
  head: {
    title?: string;
    description?: string;
    extScript?: ReactElement<HTMLScriptElement>;
  };
}

export const Layout = memo(function Layout({ children, route, user, head }: Props) {
  return (
    <>
      <Head>
        <title>{head.title}</title>
        {head.description && <meta name="description" content={head.description} key="description" />}
        {head.extScript}
      </Head>
      <HeaderBar user={user} />
      <main id="main-content" className={route !== 'landing' ? 'app-container' : undefined}>
        {children}
      </main>
      {route === 'landing' && <Footer />}
    </>
  );
});
