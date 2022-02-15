import useSWRImmutable from 'swr/immutable';

import { Loading } from '@/components/atoms';
import { Layout } from '@/components/layouts/App';
import { Carts } from '@/components/organism/cart';
import type { User } from '@/types';
import { authCSR } from '@/utils';

// eslint-disable-next-line import/no-default-export
export default function CartPage() {
  const { data: dataUser, error } = useSWRImmutable<User | undefined, Error>('/users', authCSR);

  if (!dataUser && !error) return <Loading />;

  return (
    <Layout
      head={{
        title: 'Cart | Waysbucks Coffee',
        description: 'Waysbucks user cart',
        extScript: (
          <script
            async
            type="text/javascript"
            src="https://app.sandbox.midtrans.com/snap/snap.js"
            data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
          />
        ),
      }}
      user={dataUser}
      route="cart">
      <p className="h2 mb-5">My Cart</p>
      <Carts user={dataUser} />
    </Layout>
  );
}
