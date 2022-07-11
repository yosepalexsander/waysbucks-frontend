import Image from 'next/image';
import type { ChangeEvent } from 'react';
import { memo, useCallback } from 'react';

import { NoData } from '@/assets/images';
import { Button } from '@/components/atoms';
import { ListToppingsItem } from '@/components/moleculs/admin';
import type { Topping } from '@/types';

import { TableSkeleton } from './TableSkeleton';

interface Props {
  loadingGet: boolean;
  toppings: Topping[];
  onDeleteTopping: (id: number) => void;
  onOpenModal: (item?: Topping) => void;
  onUpdateAvailability: (e: ChangeEvent<HTMLInputElement>, item: Topping) => void;
}

export const TableTopping = memo(
  ({ loadingGet, toppings, onDeleteTopping, onOpenModal, onUpdateAvailability }: Props) => {
    const handleAddNew = useCallback(() => {
      onOpenModal();
    }, [onOpenModal]);

    return (
      <>
        <div className="flex justify-end py-2">
          <Button onClick={handleAddNew} variant="contained" color="warning" className="mb-2">
            Add New
          </Button>
        </div>
        <div className="overflow-auto">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Available</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loadingGet ? (
                <TableSkeleton />
              ) : (
                <>
                  {toppings.length < 1 ? (
                    <div className="flex w-full flex-col items-center justify-center space-y-4">
                      <div className="img-container max-w-xs ">
                        <Image
                          src={NoData}
                          alt="no data"
                          layout="responsive"
                          width={50}
                          height={50}
                          objectFit="cover"
                        />
                      </div>
                      <p>Looks like there is no product</p>
                      <button onClick={handleAddNew} className="mt-2 text-blue-600">
                        Add New
                      </button>
                    </div>
                  ) : (
                    toppings.map((item, index) => (
                      <ListToppingsItem
                        key={index}
                        item={item}
                        index={index}
                        onDelete={onDeleteTopping}
                        onOpenModal={onOpenModal}
                        onUpdateAvailability={onUpdateAvailability}
                      />
                    ))
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </>
    );
  },
);
