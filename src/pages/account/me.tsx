import { Loading } from '@/components/atoms';
import { Layout } from '@/components/layouts/App';
import { Account, UserAddress } from '@/components/organism/account';
import { HeaderBar } from '@/components/organism/partial';
import { useUser } from '@/hooks/useUser';

// eslint-disable-next-line import/no-default-export
export default function AccountPage() {
  const { user, loadingGet } = useUser();

  if (loadingGet) {
    return <Loading />;
  }

  return (
    <Layout
      head={{
        title: 'Account | Waysbucks Coffee',
        description: 'Waysbucks user cart',
      }}>
      <HeaderBar user={user} />
      <main id="main-content" className="app-container">
        <div className="account-container">
          <Account user={user} />
          <UserAddress />
        </div>
      </main>
    </Layout>
  );
}
