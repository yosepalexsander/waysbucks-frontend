import type { GetServerSideProps, GetServerSidePropsResult } from 'next';
import cookies from 'next-cookies';

import { getUser } from '@/api';
import { Layout } from '@/components/layouts/App';
import { Benefits, Features, Hero } from '@/components/organism/landing';
import { createJSONRequestConfig } from '@/lib/axios';
import type { GetUserResponse, User } from '@/types';

interface Props {
  user: User | null;
}

// eslint-disable-next-line import/no-default-export
export default function HomePage({ user }: Props) {
  return (
    <Layout
      user={user}
      route="landing"
      head={{
        title: 'Waysbucks | Coffee For Everyone',
        description: 'Discover your best quality coffee in Waysbucks Coffee',
      }}>
      <article className="mt-16">
        <Hero />
        <Features />
        <Benefits />
      </article>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx): Promise<GetServerSidePropsResult<Props>> => {
  const { token } = cookies(ctx);
  const config = createJSONRequestConfig({
    Authorization: `Bearer ${token}`,
  });

  const data = await getUser<GetUserResponse>(config);
  console.log(token);
  if (data && data.payload) {
    return {
      props: {
        user: data.payload,
      },
    };
  }

  return {
    props: {
      user: null,
    },
  };
};
