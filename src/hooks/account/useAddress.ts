import { useFormik } from 'formik';
import { useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';

import { createAddress, deleteAddress, getAddress, updateAddress } from '@/api';
import type { Address, FormikHelpers } from '@/types';
import { AddressSchema } from '@/utils';

import { useAlert } from '../useAlert';
import { useDisclose } from '../useDisclose';

export const useAddress = () => {
  const { alert, handleCloseAlert, handleOpenAlert } = useAlert();
  const { isOpen: isModalMapOpen, onClose: onCloseModalMap, onOpen: onOpenModalMap } = useDisclose();
  const {
    isOpen: isModalFormAddressOpen,
    onClose: onCloseModalFormAddress,
    onOpen: onOpenModaFormAddress,
  } = useDisclose();
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

  const handleOpenModalUpdateAddress = useCallback(
    (item: Address) => {
      setSelectedAddress(item);
      onOpenModaFormAddress();
    },
    [onOpenModaFormAddress],
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
    onCloseModalFormAddress();
  }, [onCloseModalFormAddress]);

  const handleSubmitAddress = useCallback(
    async (values: Partial<Address>, formikHelpers: FormikHelpers<Partial<Address>>) => {
      const address = { ...values };

      if (!address.longitude || !address.latitude) {
        formikHelpers.setFieldError('longitude', 'Please pin your location');
        return;
      }

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

  const methods = useFormik<Partial<Address>>({
    initialValues: {
      name: selectedAddress?.name ?? '',
      phone: selectedAddress?.phone ?? '',
      address: selectedAddress?.address ?? '',
      city: selectedAddress?.city ?? '',
      postal_code: selectedAddress?.postal_code,
      longitude: selectedAddress?.longitude,
      latitude: selectedAddress?.latitude,
    },
    enableReinitialize: true,
    validationSchema: AddressSchema,
    validateOnChange: true,
    onSubmit: handleSubmitAddress,
  });
  const { resetForm: resetFormAddress, setFieldValue } = methods;

  const handleOpenModalNewAddress = useCallback(() => {
    setSelectedAddress(undefined);
    resetFormAddress();
    onOpenModaFormAddress();
  }, [resetFormAddress, onOpenModaFormAddress]);

  const handleSelectLocation = useCallback(
    async (lng: number, lat: number) => {
      await setFieldValue('longitude', lng, true);
      await setFieldValue('latitude', lat, true);
      onCloseModalMap();
    },
    [onCloseModalMap, setFieldValue],
  );

  const loadingGet = !dataAddress && !addressError;

  return {
    addresses,
    alert,
    isModalFormAddressOpen,
    isModalMapOpen,
    loadingGet,
    methods,
    selectedAddress,
    handleCloseAlert,
    handleCloseModalFormAddress,
    handleDeleteAddress,
    handleOpenModalNewAddress,
    handleOpenModalUpdateAddress,
    handleSelectLocation,
    handleUpdateAddress,
    onCloseModalMap,
    onOpenModalMap,
  };
};
