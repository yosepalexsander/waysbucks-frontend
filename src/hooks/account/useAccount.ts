import { useFormik } from 'formik';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

import { createAddress, deleteAddress, getAddress, updateAddress, updateUser } from '@/api';
import type { Address, User } from '@/types';
import { AddressSchema } from '@/utils';

import { useAlert } from '../useAlert';
import { useDisclose } from '../useDisclose';
import { useUser } from '../useUser';

export const useAccount = () => {
  const { loadingGetUser, user, userMutation } = useUser();
  const { alert, handleCloseAlert, handleOpenAlert } = useAlert();
  const { isOpen, onClose, onOpen } = useDisclose();
  const [selectedAddress, setSelectedAddress] = useState<Address>();

  const {
    data: dataAddress,
    error: addressError,
    mutate: addressMutation,
  } = useSWR<Address[] | undefined, Error>('/address', getAddress, { revalidateOnFocus: false });

  const handleSubmit = useCallback(
    async (values: Partial<User>, _formikHelpers) => {
      const { name, phone } = values;

      if (!name || !phone || !user) {
        return;
      }

      try {
        const updatedUser: User = { ...user, name, phone };

        await userMutation(
          async (draft) => {
            await updateUser(updatedUser);

            return draft;
          },
          { optimisticData: updatedUser, rollbackOnError: true },
        );
      } catch (error) {
        console.log(error);
      }
    },
    [user, userMutation],
  );

  const formUserProvider = useFormik<Partial<User>>({
    initialValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
    },
    onSubmit: handleSubmit,
  });
  const { resetForm } = formUserProvider;

  useEffect(() => {
    resetForm({
      values: {
        name: user?.name ?? '',
        email: user?.email ?? '',
        phone: user?.phone ?? '',
      },
    });
  }, [resetForm, user]);

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
      const optimisticData = [...addresses, body as Address];

      try {
        await addressMutation(
          async (draft) => {
            try {
              await createAddress(body);

              return draft;
            } catch (error) {
              throw error;
            }
          },
          { optimisticData, rollbackOnError: true },
        );
      } catch (error) {
        if (error instanceof Error) {
          handleOpenAlert('error', `Error: ${error.message}`);
        }
      }
    },
    [addressMutation, addresses, handleOpenAlert],
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
      }
    },
    [addressMutation, addresses],
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

  const handleCloseModalFormAddress = useCallback(() => {
    setSelectedAddress(undefined);
    onClose();
  }, [onClose]);

  const handleSubmitAddress = useCallback(
    async (values: Partial<Address>) => {
      const address = { ...values };

      try {
        selectedAddress ? await handleUpdateAddress(selectedAddress.id, address) : await handleCreateAddress(address);
      } catch (error) {
        console.log(error);
      } finally {
        handleCloseModalFormAddress();
      }
    },
    [handleCloseModalFormAddress, handleCreateAddress, handleUpdateAddress, selectedAddress],
  );

  const formAddressProvider = useFormik<Partial<Address>>({
    initialValues: {
      name: selectedAddress?.name ?? '',
      phone: selectedAddress?.phone ?? '',
      address: selectedAddress?.address ?? '',
      city: selectedAddress?.city ?? '',
      postal_code: selectedAddress?.postal_code,
    },
    enableReinitialize: true,
    validationSchema: AddressSchema,
    onSubmit: handleSubmitAddress,
  });

  const loadingGet = loadingGetUser || (!dataAddress && !addressError);

  return {
    addresses,
    alert,
    isOpen,
    loadingGet,
    formAddressProvider,
    formUserProvider,
    user,
    selectedAddress,
    handleCloseAlert,
    handleCloseModalFormAddress,
    handleCreateAddress,
    handleDeleteAddress,
    handleOpenModalCreateAddress,
    handleOpenModalUpdateAddress,
    handleUpdateAddress,
  };
};
