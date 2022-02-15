import { memo, useCallback } from 'react';

import { DeleteIcon } from '@/assets/icons';
import { Button, Paper } from '@/components/atoms';
import type { Address } from '@/types';

interface Props {
  item: Address;
  onDelete: (item: Address) => void;
  onUpdate: (item: Address) => void;
}

export const ListAddressesItem = memo(function ListAddressesItem({ item, onDelete, onUpdate }: Props) {
  const handleClickDelete = useCallback(() => {
    onDelete(item);
  }, [item, onDelete]);

  const handleClickUpdate = useCallback(() => {
    onUpdate(item);
  }, [item, onUpdate]);

  return (
    <div key={item.id} className="flex-item">
      <Paper>
        <div className="rounded-md flex flex-col p-2">
          <p className="h4 mb-2">{item.name}</p>
          <p>{item.phone}</p>
          <p className="truncate text-sm">{item.address}</p>
          <p className="text-sm">
            {item.city}, {item.postal_code}
          </p>
        </div>
        <div className="address-action">
          <Button variant="outlined" color="primary" className="w-4/5" onClick={handleClickUpdate}>
            Change Address
          </Button>
          <DeleteIcon size="2rem" className="text-primary" onClick={handleClickDelete} />
        </div>
      </Paper>
    </div>
  );
});
