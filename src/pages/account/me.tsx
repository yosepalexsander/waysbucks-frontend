import useSWRImmutable from 'swr/immutable';

import { getAddress } from '@/api';
import { Loading } from '@/components/atoms';
import { Layout } from '@/components/layouts/App';
import { Account, UserAddress } from '@/components/organism/account';
import type { Address, User } from '@/types';
import { authCSR } from '@/utils';

// eslint-disable-next-line import/no-default-export
export default function AccountPage() {
  const { data: dataUser, error } = useSWRImmutable<User | undefined, Error>('/users', authCSR);
  const { data: dataAddress, mutate } = useSWRImmutable<Address[] | undefined, Error>('/address', getAddress);

  if (!dataUser && !error) {
    return <Loading />;
  }

  return (
    <Layout
      head={{
        title: 'Profile | Waysbucks Coffee',
        description: 'Waysbucks user cart',
      }}
      user={dataUser}
      route="cart">
      <div className="account-container">
        <Account user={dataUser} />
        {dataAddress && <UserAddress mutator={mutate} address={dataAddress} />}
      </div>
    </Layout>
  );
}
