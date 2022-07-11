import { useFormik } from 'formik';
import { useCallback, useEffect } from 'react';

import { updateUser } from '@/api';
import type { User } from '@/types';

import { useUser } from '../useUser';

export const useAccount = () => {
  const { loadingGetUser, user, userMutation } = useUser();

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

  const methods = useFormik<Partial<User>>({
    initialValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
    },
    onSubmit: handleSubmit,
  });
  const { resetForm } = methods;

  useEffect(() => {
    resetForm({
      values: {
        name: user?.name ?? '',
        email: user?.email ?? '',
        phone: user?.phone ?? '',
      },
    });
  }, [resetForm, user]);

  const loadingGet = loadingGetUser;

  return {
    loadingGet,
    methods,
    user,
  };
};
