import useSWR from 'swr';

import type { User } from '@/types';
import { authCSR } from '@/utils';

export const useUser = () => {
  const { data: dataUser, error: userError } = useSWR<User | undefined, Error>('/users', authCSR);

  const loadingGet = !dataUser && !userError;

  return {
    user: dataUser,
    loadingGet,
  };
};
