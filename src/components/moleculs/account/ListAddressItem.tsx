import { memo, useCallback } from 'react';

import { DeleteIcon } from '@/assets/icons';
import { Button } from '@/components/atoms';
import type { Address } from '@/types';

interface Props {
  item: Address;
  onDelete: (item: Address) => void;
  onUpdate: (item: Address) => void;
}

export const ListAddressesItem = memo(({ item, onDelete, onUpdate }: Props) => {
  const handleClickDelete = useCallback(() => {
    onDelete(item);
  }, [item, onDelete]);

  const handleClickUpdate = useCallback(() => {
    onUpdate(item);
  }, [item, onUpdate]);

  return (
    <div key={item.id} className="border rounded-md p-4 space-y-4">
      <div>
        <p className="h5 mb-2">{item.name}</p>
        <div className="flex flex-col space-y-1">
          <p className="truncate text-sm">{item.address}</p>
          <p className="text-sm">
            {item.city}, {item.postal_code}
          </p>
          <p className="text-sm">{item.phone}</p>
        </div>
      </div>
      <div className="address-action">
        <Button variant="outlined" color="primary" className="w-4/5" onClick={handleClickUpdate}>
          Edit Address
        </Button>
        <DeleteIcon size="2rem" className="text-primary" onClick={handleClickDelete} />
      </div>
    </div>
  );
});
