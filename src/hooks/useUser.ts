import useSWRImmutable from 'swr/immutable';

import type { User } from '@/types';
import { authCSR } from '@/utils';

export const useUser = () => {
  const { data: dataUser, error: userError } = useSWRImmutable<User | undefined, Error>('/users', authCSR);

  const loadingGet = !dataUser && !userError;

  return {
    user: dataUser,
    loadingGet,
  };
};
