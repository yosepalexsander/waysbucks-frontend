import type { GetServerSideProps, GetServerSidePropsResult } from 'next';
import cookies from 'next-cookies';

import { getUser } from '@/api';
import { Layout } from '@/components/layouts/App';
import { Benefits, Features, Hero } from '@/components/organism/landing';
import { Footer, HeaderBar } from '@/components/organism/partial';
import { createJSONRequestConfig } from '@/lib/axios';
import type { User } from '@/types';

interface Props {
  user: User | null;
}

// eslint-disable-next-line import/no-default-export
export default function HomePage({ user }: Props) {
  return (
    <Layout
      head={{
        title: 'Waysbucks | Coffee For Everyone',
        description: 'Discover your best quality coffee in Waysbucks Coffee',
      }}>
      <HeaderBar user={user} />
      <article className="mt-16">
        <Hero />
        <Features />
        <Benefits />
      </article>
      <Footer />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx): Promise<GetServerSidePropsResult<Props>> => {
  const { token } = cookies(ctx);
  const config = createJSONRequestConfig({
    Authorization: `Bearer ${token}`,
  });

  const user = await getUser(config);

  if (user) {
    return {
      props: {
        user,
      },
    };
  }

  return {
    props: {
      user: null,
    },
  };
};
