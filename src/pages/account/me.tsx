import { FormikProvider } from 'formik';
import dynamic from 'next/dynamic';

import { Alert, Loading } from '@/components/atoms';
import { Layout } from '@/components/layouts/App';
import { Account, UserAddress } from '@/components/organism/account';
import { General } from '@/components/organism/account/General';
import { HeaderBar } from '@/components/organism/partial';
import { useAccount } from '@/hooks/account/useAccount';
import type { ModalFormAddressProps } from '@/types';

const ModalFormAddress = dynamic<ModalFormAddressProps>(
  () => import('@/components/organism/modal/ModalFormAddress').then((mod) => mod.ModalFormAddress),
  {
    ssr: false,
  },
);

// eslint-disable-next-line import/no-default-export
export default function AccountPage() {
  const {
    addresses,
    alert,
    isOpen,
    loadingGet,
    formAddressProvider,
    formUserProvider,
    user,
    selectedAddress,
    handleCloseAlert,
    handleCloseModalFormAddress,
    handleCreateAddress,
    handleDeleteAddress,
    handleOpenModalCreateAddress,
    handleOpenModalUpdateAddress,
    handleUpdateAddress,
  } = useAccount();

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
      <main id="main-content" className="main-container">
        <div className="account-container">
          <Account user={user} />
          <div className="flex flex-col space-y-4 lg:col-span-2 ">
            <section id="general">
              <FormikProvider value={formUserProvider}>
                <General />
              </FormikProvider>
            </section>
            <UserAddress
              addresses={addresses}
              onDeleteAddress={handleDeleteAddress}
              onOpenModalCreate={handleOpenModalCreateAddress}
              onOpenModalUpdate={handleOpenModalUpdateAddress}
            />
          </div>
        </div>
      </main>
      <Alert
        isOpen={alert.isOpen}
        severity={alert.status}
        position={{ bottom: 50, left: 50 }}
        onClose={handleCloseAlert}>
        {alert.message}
      </Alert>
      <FormikProvider value={formAddressProvider}>
        <ModalFormAddress
          isOpen={isOpen}
          selectedAddress={selectedAddress}
          onClose={handleCloseModalFormAddress}
          onCreateAddress={handleCreateAddress}
          onUpdateAddress={handleUpdateAddress}
        />
      </FormikProvider>
    </Layout>
  );
}
