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
      <main id="main-content" className="main-container">
        <div className="flex justify-center mt-4">
          <InputSearch placeholder="Search product..." isDisabled={loadingGet} onSearch={handleSearch} />
        </div>
        {loadingGet ? (
          <div className="product-container">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="p-2 w-80 sm:w-60">
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
              <div className="flex flex-col justify-center items-center w-full mt-4">
                <div className="img-container max-w-md mb-4">
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
