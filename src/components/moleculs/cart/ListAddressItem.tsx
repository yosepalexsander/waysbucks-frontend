import type { ChangeEvent } from 'react';
import { memo, useCallback } from 'react';

import { Paper } from '@/components/atoms';
import type { Address } from '@/types';

interface ListAddressesItemProps {
  item: Address;
  onSelect: (e: ChangeEvent<HTMLInputElement>, item: Address) => void;
}

export const ListAddressesItem = memo(function ListAddressesItem({ item, onSelect }: ListAddressesItemProps) {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onSelect(e, item);
    },
    [item, onSelect],
  );

  return (
    <div key={item.id} className="input-checkbox flex-item">
      <input type="radio" name="address[]" id={`${item.id}`} onChange={handleChange} />
      <label htmlFor={`${item.id}`} className="input-label">
        <Paper>
          <div className="rounded-md flex flex-col p-2">
            <p className="h4 mb-2">{item.name}</p>
            <p>{item.phone}</p>
            <p className="truncate text-sm">{item.address}</p>
            <p className="text-sm">
              {item.city}, {item.postal_code}
            </p>
          </div>
        </Paper>
      </label>
    </div>
  );
});
