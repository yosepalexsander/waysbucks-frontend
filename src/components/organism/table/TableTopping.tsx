import Image from 'next/image';
import type { ChangeEvent } from 'react';
import { useMemo, useState } from 'react';
import useSWRImmutable from 'swr/immutable';

import { deleteTopping, getToppings, updateTopping } from '@/api';
import { NoData } from '@/assets/images';
import { Button, Modal, Paper } from '@/components/atoms';
import { FormTopping } from '@/components/organism/form';
import { createJSONRequestConfig } from '@/lib/axios';
import type { Topping } from '@/types';
import { currencyFormat } from '@/utils';

import { TableSkeleton } from './TableSkeleton';

export const TableTopping = () => {
  const [show, setShowModal] = useState(false);
  const [selectedTopping, setSelectedTopping] = useState<Topping>();
  const {
    data: dataToppings,
    error,
    mutate: toppingMutation,
  } = useSWRImmutable('/toppings', getToppings, {
    onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
      if (error.status === 404) return;
      if (retryCount >= 5) return;
      setTimeout(() => revalidate({ retryCount }), 5000);
    },
  });

  const toppings = useMemo(() => {
    let data: Topping[] = [];

    if (!dataToppings) {
      return data;
    }

    data = dataToppings.slice(0);

    return data;
  }, [dataToppings]);

  const onClickUpdate = (item: Topping) => {
    setShowModal(true);
    setSelectedTopping(item);
  };

  const onMutationUpdate = async (topping: Topping) => {
    const idx = toppings.findIndex((item) => item.id === topping.id);
    toppings[idx] = topping;

    await toppingMutation(toppings, false);
  };
  const onClickAdd = () => {
    setShowModal(true);
    setSelectedTopping(undefined);
  };

  // always reset state on close modal
  const onCloseModal = () => {
    setShowModal(false);
  };

  // refetch after submitting topping dataToppings
  const onUpdateTopping = () => {
    setShowModal(false);
    toppingMutation();
  };

  const onUpdateAvailability = async (e: ChangeEvent<HTMLInputElement>, item: Topping) => {
    const config = createJSONRequestConfig();

    try {
      const updatedTopping: Topping = { ...item, is_available: e.target.checked };

      await updateTopping(Number(e.target.id), updatedTopping, config);
      await onMutationUpdate(updatedTopping);
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteTopping = async (id: number) => {
    try {
      await deleteTopping(id);
      await toppingMutation();
    } catch (error) {
      console.error(error);
    }
  };

  if (error && error.status === 404) {
    return (
      <div className="flex flex-col justify-center items-center w-full">
        <div className="img-container max-w-sm mb-4">
          <Image src={NoData} alt="no dataToppings" layout="responsive" width={50} height={50} objectFit="cover" />
        </div>
        <p>Looks like there is no product</p>
        <button onClick={onClickAdd} className="mt-2 text-blue-600">
          Add New
        </button>
        <Modal isOpen={show} onClose={onCloseModal}>
          <Paper
            width="100%"
            maxWidth="24rem"
            transform="translate(-50%, -50%)"
            top="50%"
            left="50%"
            padding={16}
            position="absolute"
            display="flex"
            flexDirection="column"
            alignItems="center">
            <p className="text-3xl mb-4 text-center text-primary">{selectedTopping ? 'Update' : 'New'} Topping</p>
            <FormTopping
              selectedTopping={selectedTopping}
              isUpdate={selectedTopping ? true : false}
              onSubmitSuccess={onUpdateTopping}
            />
          </Paper>
        </Modal>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end">
        <Button onClick={onClickAdd} variant="contained" color="warning" className="mb-2">
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
            {toppings ? (
              <>
                {toppings.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td className="table-name">{item.name}</td>
                    <td className="table-img">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                          layout="responsive"
                          objectFit="cover"
                          className="rounded-md"
                        />
                      )}
                    </td>
                    <td className="table-price">{currencyFormat(item.price)}</td>
                    <td>
                      <input
                        type="checkbox"
                        id={`${item.id}`}
                        name={item.name}
                        checked={item.is_available}
                        onChange={(e) => onUpdateAvailability(e, item)}
                      />
                    </td>
                    <td>
                      <Button
                        id={`update-${item.id}`}
                        variant="contained"
                        color="secondary"
                        onClick={() => onClickUpdate(item)}
                        className="py-1 m-1 w-20"
                        style={{ padding: '0.25rem' }}>
                        Update
                      </Button>
                      <Button
                        id={`delete-${item.id}`}
                        variant="outlined"
                        color="danger"
                        onClick={() => onDeleteTopping(item.id)}
                        className="py-1 m-1 w-20"
                        style={{ padding: '0.25rem' }}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <TableSkeleton />
            )}
          </tbody>
        </table>
      </div>
      <Modal isOpen={show} onClose={onCloseModal}>
        <Paper
          width="100%"
          maxWidth="24rem"
          transform="translate(-50%, -50%)"
          top="50%"
          left="50%"
          padding={16}
          position="absolute"
          display="flex"
          flexDirection="column"
          alignItems="center">
          <p className="text-3xl mb-4 text-center text-primary">{selectedTopping ? 'Update' : 'New'} Topping</p>
          <FormTopping
            selectedTopping={selectedTopping}
            isUpdate={selectedTopping ? true : false}
            onSubmitSuccess={onUpdateTopping}
          />
        </Paper>
      </Modal>
    </>
  );
};
