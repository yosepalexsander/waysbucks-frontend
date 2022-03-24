import type { ChangeEvent } from 'react';
import { useMemo, useState } from 'react';
import useSWR from 'swr';

import { getProducts } from '@/api';
import type { Product } from '@/types';

export const useProducts = () => {
  const [searchText, setSearchText] = useState('');

  const { data: dataProduct, error } = useSWR<Product[] | undefined>('data', getProducts, {
    onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
      if (error.status === 404) return;
      if (retryCount >= 5) return;
      setTimeout(() => revalidate({ retryCount }), 5000);
    },
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value);

  const products = useMemo(() => {
    let data: Product[] = [];

    if (!dataProduct) {
      return data;
    }

    if (!searchText) {
      data = dataProduct.slice(0);
      return data;
    }

    return dataProduct.filter(
      (product: Product) => product.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1,
    );
  }, [dataProduct, searchText]);

  const loadingGet = !dataProduct && !error;
  const isNotFound = error && error.status === 404;

  return {
    isNotFound,
    loadingGet,
    products,
    handleSearch,
  };
};
