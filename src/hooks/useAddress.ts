import { useCallback, useMemo, useState } from 'react';
import useSWRImmutable from 'swr/immutable';

import { createAddress, deleteAddress, getAddress, updateAddress } from '@/api';
import type { Address } from '@/types';

import { useDisclose } from './useDisclose';

export const useAddress = () => {
  const { isOpen, onClose, onOpen } = useDisclose();
  const [selectedAddress, setSelectedAddress] = useState<Address>();

  const {
    data: dataAddress,
    error: addressError,
    mutate: addressMutation,
  } = useSWRImmutable<Address[] | undefined, Error>('/address', getAddress);

  const addresses = useMemo(() => {
    let data: Address[] = [];

    if (!dataAddress) {
      return data;
    }

    data = dataAddress.slice(0);

    return data;
  }, [dataAddress]);

  const handleOpenModalCreateAddress = useCallback(() => {
    onOpen();
    setSelectedAddress(undefined);
  }, [onOpen]);

  const handleOpenModalUpdateAddress = useCallback(
    (item: Address) => {
      onOpen();
      setSelectedAddress(item);
    },
    [onOpen],
  );

  const handleCreateAddress = useCallback(
    async (body: Partial<Address>) => {
      await createAddress(body);
      onClose();
      addressMutation();
    },
    [addressMutation, onClose],
  );

  const handleUpdateAddress = useCallback(
    async (id: string, body: Partial<Address>) => {
      try {
        await updateAddress(id, body);

        const address = { id, ...body } as Address;
        const idx = addresses.findIndex((item) => item.id === id);
        addresses[idx] = address;

        await addressMutation(addresses, false);
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
      try {
        await deleteAddress(item.id);
        await addressMutation();
      } catch (error) {
        console.error(error);
      }
    },
    [addressMutation],
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
