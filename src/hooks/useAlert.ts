import { useCallback, useState } from 'react';

import type { AlertState } from '@/types';

export const useAlert = () => {
  const [alert, setAlert] = useState<AlertState>({ isOpen: false, message: '' });

  const handleOpenAlert = useCallback((status: 'success' | 'error' | 'warning' | 'info', message: string) => {
    setAlert({ isOpen: true, status, message });
  }, []);

  const handleCloseAlert = useCallback(() => {
    setAlert((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return {
    alert,
    handleCloseAlert,
    handleOpenAlert,
  };
};
