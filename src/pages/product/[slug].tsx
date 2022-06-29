import type { GetServerSideProps, GetServerSidePropsResult } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import cookies from 'next-cookies';

import { getUser } from '@/api';
import { NoData, ProductPlaceholder } from '@/assets/images';
import { Alert, Button, Loading } from '@/components/atoms';
import { Layout } from '@/components/layouts/App';
import { HeaderBar } from '@/components/organism/partial';
import { ListToppings } from '@/components/organism/product';
import { useProduct } from '@/hooks/useProduct';
import { createJSONRequestConfig } from '@/lib/axios';
import type { User } from '@/types';
import { currencyFormat } from '@/utils';

interface Props {
  user: User | null;
}

// eslint-disable-next-line import/no-default-export
export default function DetailProductPage({ user }: Props) {
  const { alert, loadingGet, product, total, handleAddToCart, handleSelectTopping, handleCloseAlert } = useProduct();

  return (
    <Layout
      head={{
        title: 'Detail Product | Waysbucks Coffee',
        description: 'Waysbucks detail product coffee',
      }}>
      <HeaderBar user={user} />
      <main id="main-content" className="main-container">
        {loadingGet ? (
          <Loading />
        ) : !product ? (
          <div className="flex flex-col justify-center items-center w-full">
            <div className="img-container max-w-md mb-4">
              <Image src={NoData} alt="no data" width={50} height={50} layout="responsive" objectFit="cover" />
            </div>
            <p>Looks like there is no product here</p>
            <Link href={{ pathname: '/' }}>
              <a className="text-blue-600">Back to Home</a>
            </Link>
          </div>
        ) : (
          <div className="product flex-container">
            <div className="product-img">
              <Image
                src={product.image ?? ProductPlaceholder}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
                priority
              />
            </div>
            <div className="product-info">
              <div className="flex flex-col space-y-4">
                <p className="name">{product.name}</p>
                <p className="desc">{product.description}</p>
              </div>
              <p className="price">Price: {currencyFormat(product.price as number)}</p>
              <div className="flex flex-col space-y-4">
                <p className="text-2xl font-bold">Topping</p>
                <ListToppings onChange={handleSelectTopping} />
              </div>
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between">
                  <p className="total">Total:</p>
                  <p className="total">{currencyFormat(total)}</p>
                </div>
                <Button variant="contained" color="primary" className="w-full" onClick={handleAddToCart}>
                  Add To Cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Alert
        isOpen={alert.isOpen}
        severity={alert.status}
        position={{
          bottom: 35,
          right: 35,
        }}
        onClose={handleCloseAlert}>
        {alert.message}
      </Alert>
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
