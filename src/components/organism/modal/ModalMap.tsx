import { useFormikContext } from 'formik';
import { memo, useCallback, useState } from 'react';

import { Modal, Paper } from '@/components/atoms';
import type { Address, ModalMapProps } from '@/types';

import { MapboxMap } from '../map/MapboxMap';

export const ModalMap = memo(({ isOpen, onClose, onSelectLocation }: ModalMapProps) => {
  const { values } = useFormikContext<Partial<Address>>();
  const [isLoading, setIsLoading] = useState(true);

  const handleMapLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Paper
        width="100%"
        height="100%"
        maxWidth="100vh"
        maxHeight="60vh"
        transform="translate(-50%, -50%)"
        top="50%"
        left="50%"
        padding={16}
        position="absolute"
        display="flex"
        flexDirection="column"
        alignItems="center">
        <MapboxMap
          isLoading={isLoading}
          originLng={values?.longitude}
          originLat={values?.latitude}
          onMapLoading={handleMapLoading}
          onSelect={onSelectLocation}
        />
      </Paper>
    </Modal>
  );
});
