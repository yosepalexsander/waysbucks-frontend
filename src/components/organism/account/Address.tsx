import dynamic from 'next/dynamic';
import { memo, useCallback, useState } from 'react';

import { deleteAddress } from '@/api';
import { Button } from '@/components/atoms';
import { ListAddressesItem } from '@/components/moleculs/account';
import { useDisclose } from '@/hooks/useDisclose';
import type { Address, ModalFormAddressProps } from '@/types';

const ModalFormAddress = dynamic<ModalFormAddressProps>(() => import('../modal').then((mod) => mod.ModalFormAddress), {
  ssr: false,
});

interface Props {
  address: Address[] | undefined;
  mutator: any;
}

export const UserAddress = memo(function UserAddress({ address, mutator }: Props) {
  const { isOpen, onClose, onOpen } = useDisclose();
  const [selectedAddress, setSelectedAddress] = useState<Address>();

  const handleOpenFormCreate = useCallback(() => {
    onOpen();
    setSelectedAddress(undefined);
  }, [onOpen]);

  const handleOpenFormUpdate = useCallback(
    (item: Address) => {
      onOpen();
      setSelectedAddress(item);
    },
    [onOpen],
  );

  const handleUpdateAddress = () => {
    onClose();
    mutator();
  };

  const handleDeleteAddress = async (item: Address) => {
    try {
      await deleteAddress(item.id);
      await mutator();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section id="user-address">
      <span>
        <h1 className="h2">My Address</h1>
        <Button onClick={handleOpenFormCreate} variant="contained" color="warning" className="py-1">
          Add New
        </Button>
      </span>
      {address && (
        <div className="address-list flex-container">
          {address.map((item) => (
            <ListAddressesItem
              key={item.id}
              item={item}
              onDelete={handleDeleteAddress}
              onUpdate={handleOpenFormUpdate}
            />
          ))}
        </div>
      )}
      <ModalFormAddress
        isOpen={isOpen}
        selectedAddress={selectedAddress}
        onClose={onClose}
        onUpdateAddress={handleUpdateAddress}
      />
    </section>
  );
});
