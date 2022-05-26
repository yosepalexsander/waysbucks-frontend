import useSWR from 'swr';

import type { User } from '@/types';
import { authCSR } from '@/utils';

export const useUser = () => {
  const {
    data: user,
    error: userError,
    mutate: userMutation,
  } = useSWR<User | undefined, Error>('/users', authCSR, { revalidateOnFocus: false });

  const loadingGetUser = !user && !userError;

  return {
    loadingGetUser,
    user,
    userMutation,
  };
};
