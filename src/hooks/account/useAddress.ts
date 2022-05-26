import { useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';

import { createAddress, deleteAddress, getAddress, updateAddress } from '@/api';
import type { Address } from '@/types';

import { useDisclose } from '../useDisclose';

export const useAddress = () => {
  const { isOpen, onClose, onOpen } = useDisclose();
  const [selectedAddress, setSelectedAddress] = useState<Address>();

  const {
    data: dataAddress,
    error: addressError,
    mutate: addressMutation,
  } = useSWR<Address[] | undefined, Error>('/address', getAddress, { revalidateOnFocus: false });

  const addresses = useMemo(() => {
    let data: Address[] = [];

    if (!dataAddress) {
      return data;
    }

    data = dataAddress.slice(0);

    return data;
  }, [dataAddress]);

  const handleOpenModalCreateAddress = useCallback(() => {
    setSelectedAddress(undefined);
    onOpen();
  }, [onOpen]);

  const handleOpenModalUpdateAddress = useCallback(
    (item: Address) => {
      setSelectedAddress(item);
      onOpen();
    },
    [onOpen],
  );

  const handleCreateAddress = useCallback(
    async (body: Partial<Address>) => {
      const optimisticData = [body as Address, ...addresses];

      try {
        await addressMutation(
          async (draft) => {
            await createAddress(body);

            return draft;
          },
          { optimisticData, rollbackOnError: true },
        );
      } catch (error) {
        console.log(error);
      } finally {
        onClose();
      }
    },
    [addressMutation, addresses, onClose],
  );

  const handleUpdateAddress = useCallback(
    async (id: string, body: Partial<Address>) => {
      const optimisticData = addresses.slice(0);
      const idx = optimisticData.findIndex((item) => item.id === id);
      optimisticData[idx] = { id, ...body } as Address;

      try {
        await addressMutation(
          async (draft) => {
            await updateAddress(id, body);

            return draft;
          },
          { optimisticData: addresses, rollbackOnError: true },
        );
      } catch (error) {
        console.log(error);
      } finally {
        onClose();
      }
    },
    [addressMutation, addresses, onClose],
  );

  const handleDeleteAddress = useCallback(
    async (item: Address) => {
      const optimisticData = addresses.filter((address) => address.id !== item.id);

      try {
        await addressMutation(
          async (draft) => {
            await deleteAddress(item.id);

            return draft;
          },
          { optimisticData, rollbackOnError: true },
        );
      } catch (error) {
        console.error(error);
      }
    },
    [addressMutation, addresses],
  );

  const loadingGet = !dataAddress && !addressError;

  return {
    addresses,
    isOpen,
    loadingGet,
    selectedAddress,
    handleCreateAddress,
    handleDeleteAddress,
    handleOpenModalCreateAddress,
    handleOpenModalUpdateAddress,
    handleUpdateAddress,
    onClose,
  };
};
