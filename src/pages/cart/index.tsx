import { Loading } from '@/components/atoms';
import { Layout } from '@/components/layouts/App';
import { Carts } from '@/components/organism/cart';
import { HeaderBar } from '@/components/organism/partial';
import { useUser } from '@/hooks/useUser';

// eslint-disable-next-line import/no-default-export
export default function CartPage() {
  const { user, loadingGetUser } = useUser();

  if (loadingGetUser) {
    return <Loading />;
  }

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
      }}>
      <HeaderBar user={user} />
      <main id="main-content" className="main-container">
        <p className="h2 mb-5">My Cart</p>
        <Carts user={user} />
      </main>
    </Layout>
  );
}
