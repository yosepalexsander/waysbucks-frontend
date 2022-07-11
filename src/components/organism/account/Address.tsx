import Image from 'next/image';
import { memo } from 'react';

import { PlusIcon } from '@/assets/icons';
import { NoData } from '@/assets/images';
import { Button } from '@/components/atoms';
import { ListAddressesItem } from '@/components/moleculs/account';
import type { Address } from '@/types';

export interface Props {
  addresses: Address[];
  onDeleteAddress: (item: Address) => void;
  onOpenModalCreate: () => void;
  onOpenModalUpdate: (item: Address) => void;
}

export const UserAddress = memo(({ addresses, onDeleteAddress, onOpenModalCreate, onOpenModalUpdate }: Props) => {
  return (
    <section id="user-address" className="rounded-md bg-white p-5 shadow-md">
      <span>
        <h1 className="h4">Address</h1>
        {addresses.length > 0 && (
          <Button size="sm" variant="contained" color="warning" onClick={onOpenModalCreate}>
            Add new
          </Button>
        )}
      </span>
      {addresses.length > 0 ? (
        <div className="grid grid-flow-row gap-4 md:grid-cols-2">
          {addresses.map((item) => (
            <ListAddressesItem key={item.id} item={item} onDelete={onDeleteAddress} onUpdate={onOpenModalUpdate} />
          ))}
        </div>
      ) : (
        <div className="flex w-full flex-col items-center justify-center space-y-4">
          <div className="img-container max-w-xs">
            <Image src={NoData} alt="no data" layout="responsive" width={50} height={50} objectFit="cover" />
          </div>
          <p className="text-center">
            Address not found
            <br />
            Let&apos;s create new address
          </p>
          <Button
            size="sm"
            variant="contained"
            color="primary"
            leftIcon={<PlusIcon size="1.25rem" />}
            onClick={onOpenModalCreate}>
            Create Address
          </Button>
        </div>
      )}
    </section>
  );
});
