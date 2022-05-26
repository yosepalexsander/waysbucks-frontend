import Image from 'next/image';
import type { ChangeEvent } from 'react';
import { memo, useCallback } from 'react';

import { NoData } from '@/assets/images';
import { Button } from '@/components/atoms';
import { ListProductsItem } from '@/components/moleculs/admin';
import type { Product } from '@/types';

import { TableSkeleton } from './TableSkeleton';

interface Props {
  loadingGet: boolean;
  products: Product[];
  onDeleteProduct: (id: number) => void;
  onOpenModal: (item?: Product) => void;
  onUpdateAvailability: (e: ChangeEvent<HTMLInputElement>, item: Product) => void;
}

export const TableProduct = memo(
  ({ loadingGet, products, onDeleteProduct, onOpenModal, onUpdateAvailability }: Props) => {
    const handleAddNew = useCallback(() => {
      onOpenModal();
    }, [onOpenModal]);

    return (
      <>
        <div className="flex py-2 justify-end">
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
                  {products.length < 1 ? (
                    <div className="flex flex-col justify-center items-center w-full">
                      <div className="img-container max-w-sm mb-4">
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
                    <>
                      {products.map((item, index) => (
                        <ListProductsItem
                          key={index}
                          item={item}
                          index={index}
                          onDelete={onDeleteProduct}
                          onOpenModal={onOpenModal}
                          onUpdateAvailability={onUpdateAvailability}
                        />
                      ))}
                    </>
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
