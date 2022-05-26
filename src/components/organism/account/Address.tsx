import Image from 'next/image';
import { memo } from 'react';

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
    <section id="user-address" className="bg-white p-5 rounded-md shadow-md">
      <span>
        <h1 className="h4">Address</h1>
        {addresses.length > 0 && (
          <Button size="sm" variant="contained" color="warning" onClick={onOpenModalCreate}>
            Add new
          </Button>
        )}
      </span>
      {addresses.length > 0 ? (
        <div className="grid grid-flow-row md:grid-cols-2 gap-4">
          {addresses.map((item) => (
            <ListAddressesItem key={item.id} item={item} onDelete={onDeleteAddress} onUpdate={onOpenModalUpdate} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center space-y-4 w-full">
          <div className="img-container max-w-xs">
            <Image src={NoData} alt="no data" layout="responsive" width={50} height={50} objectFit="cover" />
          </div>
          <p>Let&apos;s add an address to make it easier for us to deliver your order</p>
          <Button size="sm" variant="contained" color="primary" onClick={onOpenModalCreate}>
            Create Address
          </Button>
        </div>
      )}
    </section>
  );
});
