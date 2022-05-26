import Image from 'next/image';
import type { ChangeEvent } from 'react';
import { memo, useCallback } from 'react';

import { ProductPlaceholder } from '@/assets/images';
import { Button } from '@/components/atoms';
import type { Topping } from '@/types';
import { currencyFormat } from '@/utils';

interface Props {
  item: Topping;
  index: number;
  onDelete: (id: number) => void;
  onOpenModal: (item: Topping) => void;
  onUpdateAvailability: (e: ChangeEvent<HTMLInputElement>, item: Topping) => void;
}

export const ListToppingsItem = memo(({ item, index, onDelete, onOpenModal, onUpdateAvailability }: Props) => {
  const handleChange = useCallback(
    (e) => {
      onUpdateAvailability(e, item);
    },
    [item, onUpdateAvailability],
  );

  const handleClickUpdate = useCallback(() => {
    onOpenModal(item);
  }, [item, onOpenModal]);

  const handleClickDelete = useCallback(() => {
    onDelete(item.id);
  }, [item.id, onDelete]);

  const isImageUrlValid = /^(http|https).*/.test(item.image);

  return (
    <tr>
      <td>{index + 1}</td>
      <td className="table-name">{item.name}</td>
      <td className="table-img">
        <Image
          src={isImageUrlValid ? item.image : ProductPlaceholder}
          alt={item.name}
          width={50}
          height={50}
          objectFit="contain"
          layout="responsive"
          className="rounded-md"
        />
      </td>
      <td className="table-price">{currencyFormat(item.price)}</td>
      <td>
        <input type="checkbox" name={item.name} id={`${item.id}`} checked={item.is_available} onChange={handleChange} />
      </td>
      <td>
        <div className="flex justify-center">
          <div className="flex flex-col space-y-2">
            <Button
              id={`update-${item.id}`}
              color="secondary"
              size="sm"
              variant="contained"
              onClick={handleClickUpdate}>
              Update
            </Button>
            <Button id={`delete-${item.id}`} color="danger" size="sm" variant="outlined" onClick={handleClickDelete}>
              Delete
            </Button>
          </div>
        </div>
      </td>
    </tr>
  );
});
