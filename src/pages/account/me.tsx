import { FormikProvider } from 'formik';
import dynamic from 'next/dynamic';

import { Alert, Loading } from '@/components/atoms';
import { Layout } from '@/components/layouts/App';
import { Account, UserAddress } from '@/components/organism/account';
import { General } from '@/components/organism/account/General';
import { HeaderBar } from '@/components/organism/partial';
import { useAccount } from '@/hooks/account/useAccount';
import { useAddress } from '@/hooks/account/useAddress';
import type { ModalFormAddressProps, ModalMapProps } from '@/types';

const ModalFormAddress = dynamic<ModalFormAddressProps>(
  () => import('@/components/organism/modal/ModalFormAddress').then((mod) => mod.ModalFormAddress),
  {
    ssr: false,
  },
);
const ModalMap = dynamic<ModalMapProps>(
  () => import('@/components/organism/modal/ModalMap').then((mod) => mod.ModalMap),
  {
    ssr: false,
  },
);

// eslint-disable-next-line import/no-default-export
export default function AccountPage() {
  const { loadingGet, methods: formUserProvider, user } = useAccount();
  const {
    addresses,
    alert,
    isModalFormAddressOpen,
    isModalMapOpen,
    loadingGet: loadingGetAddress,
    methods: formAddressProvider,
    selectedAddress,
    handleSelectLocation,
    handleCloseAlert,
    handleCloseModalFormAddress,
    handleDeleteAddress,
    handleOpenModalNewAddress,
    handleOpenModalUpdateAddress,
    handleUpdateAddress,
    onCloseModalMap,
    onOpenModalMap,
  } = useAddress();

  if (loadingGet || loadingGetAddress) {
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
              onOpenModalCreate={handleOpenModalNewAddress}
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
          isOpen={isModalFormAddressOpen}
          selectedAddress={selectedAddress}
          onClose={handleCloseModalFormAddress}
          onOpenMap={onOpenModalMap}
          onUpdateAddress={handleUpdateAddress}
        />
        <ModalMap isOpen={isModalMapOpen} onClose={onCloseModalMap} onSelectLocation={handleSelectLocation} />
      </FormikProvider>
    </Layout>
  );
}
