import type { GetServerSideProps, GetServerSidePropsResult } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import cookies from 'next-cookies';

import { getUser } from '@/api';
import { NoData } from '@/assets/images';
import { Layout } from '@/components/layouts/App';
import { ProductItem } from '@/components/moleculs';
import { InputSearch } from '@/components/moleculs/InputSearch';
import { HeaderBar } from '@/components/organism/partial';
import { useProducts } from '@/hooks/useProducts';
import { createJSONRequestConfig } from '@/lib/axios';
import type { User } from '@/types';

interface Props {
  user: User | null;
}

// eslint-disable-next-line import/no-default-export
export default function ProductPage({ user }: Props) {
  const { isNotFound, loadingGet, products, handleSearch } = useProducts();

  return (
    <Layout
      head={{
        title: 'Products | Waysbucks Coffee',
        description: 'All product list in Waysbucks coffee',
      }}>
      <HeaderBar user={user} />
      <main id="main-content" className="main-container flex flex-col space-y-4">
        <div className="flex justify-center">
          <InputSearch placeholder="Search product..." isDisabled={loadingGet} onSearch={handleSearch} />
        </div>
        {loadingGet ? (
          <div className="product-container">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="max-w-xs">
                <div className="card skeleton skeleton-wave">
                  <span className="card-image" />
                  <span className="card-content" />
                  <span className="card-content" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {isNotFound ? (
              <div className="mt-4 flex w-full flex-col items-center justify-center">
                <div className="img-container mb-4 max-w-md">
                  <Image src={NoData} alt="no data" layout="responsive" width={50} height={50} objectFit="cover" />
                </div>
                <p>Looks like there is no product</p>
                <Link href={{ pathname: '/' }}>
                  <a className="text-blue-600">Back to Home</a>
                </Link>
              </div>
            ) : (
              <>
                {products.length > 0 ? (
                  <div className="product-container">
                    {products.map((product) => (
                      <Link key={product.id} href={{ pathname: `/product/${product.id}` }}>
                        <a>
                          <ProductItem item={product} />
                        </a>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div>
                    <p className="h3 mt-12 text-center">No Matching Result</p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx): Promise<GetServerSidePropsResult<Props>> => {
  const { token } = cookies(ctx);
  const config = createJSONRequestConfig({
    Authorization: `Bearer ${token}`,
  });

  try {
    const user = await getUser(config);

    return {
      props: {
        user: user ?? null,
      },
    };
  } catch (error) {
    return {
      props: {
        user: null,
      },
    };
  }
};
