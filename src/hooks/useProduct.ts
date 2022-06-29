import { useRouter } from 'next/router';
import type { ChangeEvent } from 'react';
import { useCallback, useMemo, useState } from 'react';
import useSWRImmutable from 'swr/immutable';

import { getProduct, postCart } from '@/api';
import type { Product, RequestError } from '@/types';

import { useAlert } from './useAlert';

export const useProduct = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { alert, handleOpenAlert, handleCloseAlert } = useAlert();
  const [toppingIds, setToppingIds] = useState<number[]>([]);
  const [toppingPrice, setToppingPrice] = useState<number[]>([]);

  const { data: dataProduct, error: productError } = useSWRImmutable<Product | undefined, RequestError>(
    router.isReady ? `${slug}` : null,
    getProduct,
  );

  const product = useMemo(() => {
    if (!dataProduct) {
      return;
    }

    return { ...dataProduct };
  }, [dataProduct]);

  const total = toppingPrice.reduce<number>((sum, curr) => {
    return (sum += curr);
  }, product?.price || 0);

  const handleAddToCart = useCallback(async () => {
    if (!product) {
      return;
    }

    const data: Record<string, unknown> = {
      product_id: product.id,
      topping_id: toppingIds,
      qty: 1,
      price: total,
    };

    try {
      await postCart(data);

      router.push('/cart');
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Not Authenticated') {
          router.push('/login');
          return;
        }

        handleOpenAlert('error', error.message);
      }
    }
  }, [handleOpenAlert, product, router, toppingIds, total]);

  const handleSelectTopping = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setToppingIds((prev) => [...prev, parseInt(e.target.id, 10)]);
      setToppingPrice((prev) => [...prev, parseInt(e.target.value, 10)]);
    } else {
      setToppingIds((prev) => prev.filter((item) => item != parseInt(e.target.id, 10)));
      setToppingPrice((prev) => prev.filter((item) => item != parseInt(e.target.value, 10)));
    }
  }, []);

  const loadingGet = !dataProduct && !productError;

  return {
    alert,
    loadingGet,
    product,
    total,
    handleAddToCart,
    handleCloseAlert,
    handleSelectTopping,
  };
};
