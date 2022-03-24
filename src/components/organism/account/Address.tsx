import dynamic from 'next/dynamic';
import { memo } from 'react';

import { Button, Loading } from '@/components/atoms';
import { ListAddressesItem } from '@/components/moleculs/account';
import { useAddress } from '@/hooks/useAddress';
import type { ModalFormAddressProps } from '@/types';

const ModalFormAddress = dynamic<ModalFormAddressProps>(() => import('../modal').then((mod) => mod.ModalFormAddress), {
  ssr: false,
});

export const UserAddress = memo(() => {
  const {
    addresses,
    isOpen,
    loadingGet,
    selectedAddress,
    handleDeleteAddress,
    handleOpenModalCreateAddress,
    handleOpenModalUpdateAddress,
    handleCreateAddress,
    handleUpdateAddress,
    onClose,
  } = useAddress();

  return (
    <section id="user-address">
      {loadingGet ? (
        <Loading />
      ) : (
        <>
          <span>
            <h1 className="h2">My Address</h1>
            <Button onClick={handleOpenModalCreateAddress} variant="contained" color="warning" className="py-1">
              Add New
            </Button>
          </span>
          {}
          <div className="address-list flex-container">
            {addresses.map((item) => (
              <ListAddressesItem
                key={item.id}
                item={item}
                onDelete={handleDeleteAddress}
                onUpdate={handleOpenModalUpdateAddress}
              />
            ))}
          </div>
          <ModalFormAddress
            isOpen={isOpen}
            selectedAddress={selectedAddress}
            onClose={onClose}
            onCreateAddress={handleCreateAddress}
            onUpdateAddress={handleUpdateAddress}
          />
        </>
      )}
    </section>
  );
});
