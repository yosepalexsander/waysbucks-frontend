import type { GetServerSideProps, GetServerSidePropsResult } from 'next';
import Error from 'next/error';
import Image from 'next/image';
import Link from 'next/link';
import cookies from 'next-cookies';
import type { ChangeEvent } from 'react';
import { useMemo, useState } from 'react';
import useSWR from 'swr';

import { getProducts, getUser } from '@/api';
import { NoData } from '@/assets/images';
import { Layout } from '@/components/layouts/App';
import { ProductItem } from '@/components/moleculs';
import { InputSearch } from '@/components/moleculs/InputSearch';
import { createJSONRequestConfig } from '@/lib/axios';
import type { GetProductsResponse, GetUserResponse, Product, User } from '@/types';

interface Props {
  user: User | null;
}

// eslint-disable-next-line import/no-default-export
export default function ProductPage({ user }: Props) {
  const { data: productData, error: productError } = useSWR<GetProductsResponse>('products', getProducts, {
    onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
      if (error.status === 404) return;
      if (retryCount >= 5) return;
      setTimeout(() => revalidate({ retryCount }), 5000);
    },
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);

  const filteredProducts = useMemo(() => {
    let products: Product[] = [];

    if (productData?.payload) {
      products = productData.payload.slice(0);
    }

    if (!searchQuery) {
      return products;
    }

    return products.filter((product: Product) => product.name.toLowerCase().indexOf(searchQuery) !== -1);
  }, [productData?.payload, searchQuery]);

  if (productError && productError.status >= 500) {
    return <Error statusCode={productError.status} title={productError.message} />;
  }

  return (
    <Layout
      head={{
        title: 'Products | Waysbucks Coffee',
        description: 'All product list in Waysbucks coffee',
      }}
      user={user}
      route="product">
      <div className="flex justify-center mt-4">
        <InputSearch placeholder="Search product..." onSearch={handleSearch} />
      </div>
      {productError && productError.status === 404 && (
        <div className="flex flex-col justify-center items-center w-full">
          <div className="img-container max-w-md mb-4">
            <Image src={NoData} alt="no data" layout="responsive" width={50} height={50} objectFit="cover" />
          </div>
          <p>Looks like there is no product</p>
          <Link href={{ pathname: '/' }}>
            <a className="text-blue-600">Back to Home</a>
          </Link>
        </div>
      )}
      {!productData && !productError ? (
        <div className="product-container">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="p-2 w-80 sm:w-60">
              <div className="card skeleton skeleton-wave">
                <span className="card-image"></span>
                <span className="card-content"></span>
                <span className="card-content"></span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {filteredProducts.length != 0 ? (
            <div className="product-container">
              {filteredProducts?.map((product) => (
                <Link key={product.id} href={{ pathname: `/product/${product.id}` }}>
                  <a className="p-2 w-80 sm:w-60">
                    <ProductItem item={product} />
                  </a>
                </Link>
              ))}
            </div>
          ) : (
            <div>
              <p className="h3 text-center mt-12">No Matching Result</p>
            </div>
          )}
        </>
      )}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx): Promise<GetServerSidePropsResult<Props>> => {
  const { token } = cookies(ctx);

  const config = createJSONRequestConfig({
    Authorization: `Bearer ${token}`,
  });

  const data = await getUser<GetUserResponse>(config);

  if (data) {
    return {
      props: {
        user: data.payload,
      },
    };
  }

  return {
    props: {
      user: null,
    },
  };
};
