import { useMemo } from 'react';
import useSWR from 'swr';

import { getCarts } from '@/api';
import type { Cart, User } from '@/types';

import { useDisclose } from './useDisclose';

interface UseHeaderParams {
  user?: User | null;
}
export const useHeader = ({ user }: UseHeaderParams) => {
  const { isOpen: isDrawerOpen, onClose: onCloseDrawer, onOpen: onOpenDrawer } = useDisclose();
  const { isOpen: isDropdownOpen, onClose: onCloseDropdown, onOpen: onOpenDropdown } = useDisclose();

  const { data: cartData } = useSWR<Cart[] | undefined>(user && !user.is_admin ? `/carts/${user.id}` : null, getCarts, {
    revalidateOnFocus: false,
    onErrorRetry: (error) => {
      if (error?.status === 404) return;
    },
  });

  const carts = useMemo(() => {
    let data: Cart[] = [];

    if (!cartData) {
      return;
    }

    data = cartData.slice(0);

    return data;
  }, [cartData]);

  const initialName = String(user?.name).substring(0, 2).toUpperCase() ?? '';

  return {
    carts,
    user: user,
    initialName,
    isDrawerOpen,
    isDropdownOpen,
    onCloseDrawer,
    onCloseDropdown,
    onOpenDrawer,
    onOpenDropdown,
  };
};
