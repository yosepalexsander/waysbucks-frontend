import type { ChangeEvent } from 'react';
import { memo, useCallback } from 'react';

import { Paper } from '@/components/atoms';
import type { Address } from '@/types';

interface ListAddressesItemProps {
  index?: number;
  item: Address;
  selectedAddress?: Address;
  onSelect: (e: ChangeEvent<HTMLInputElement>, item: Address) => void;
}

export const ListAddressesItem = memo(({ index, item, selectedAddress, onSelect }: ListAddressesItemProps) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onSelect(e, item);
    },
    [item, onSelect],
  );

  return (
    <li key={item.id} className="input-checkbox flex-item max-w-sm flex-1">
      <input
        id={`${item.id}`}
        type="checkbox"
        name={`address-${index}`}
        checked={item.id === selectedAddress?.id}
        onChange={handleChange}
      />
      <label htmlFor={`${item.id}`} className="input-label">
        <Paper>
          <div className="flex flex-col rounded-md p-2">
            <p className="h4 mb-2">{item.name}</p>
            <p>{item.phone}</p>
            <p className="truncate text-sm">{item.address}</p>
            <p className="text-sm">
              {item.city}, {item.postal_code}
            </p>
          </div>
        </Paper>
      </label>
    </li>
  );
});
