import type { GetServerSideProps, GetServerSidePropsResult } from 'next';
import Error from 'next/error';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cookies from 'next-cookies';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import useSWRImmutable from 'swr/immutable';

import { getProduct, getUser, postCart } from '@/api';
import { NoData, ProductPlaceholder } from '@/assets/images';
import { Alert, Button, Loading } from '@/components/atoms';
import { Layout } from '@/components/layouts/App';
import { ListToppings } from '@/components/organism/product';
import { createJSONRequestConfig } from '@/lib/axios';
import type { GetProductResponse, GetUserResponse, RequestError, User } from '@/types';
import { currencyFormat } from '@/utils';

interface Props {
  user: User | null;
}

// eslint-disable-next-line import/no-default-export
export default function DetailProductPage({ user }: Props) {
  const router = useRouter();
  const { slug } = router.query;
  const { data: product, error: productError } = useSWRImmutable<GetProductResponse, RequestError>(
    router.isReady ? `${slug}` : null,
    getProduct,
  );
  const [toppingIds, setToppingIds] = useState<number[]>([]);
  const [toppingPrice, setToppingPrice] = useState<number[]>([]);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [error, setError] = useState({
    isError: false,
    message: '',
  });

  const onCloseAlert = () => setShowAlert(false);

  const onToppingChecked = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setToppingIds((prev) => [...prev, parseInt(e.target.id, 10)]);
      setToppingPrice((prev) => [...prev, parseInt(e.target.value, 10)]);
    } else {
      setToppingIds((prev) => prev.filter((item) => item != parseInt(e.target.id, 10)));
      setToppingPrice((prev) => prev.filter((item) => item != parseInt(e.target.value, 10)));
    }
  };

  const total = toppingPrice.reduce<number>((sum, curr) => {
    return (sum += curr);
  }, product?.payload?.price || 0);

  const onAddToCart = async (id: number | undefined) => {
    const data: Record<string, any> = {
      product_id: id,
      topping_id: toppingIds,
      qty: 1,
      price: total,
    };

    const config = createJSONRequestConfig();

    const response = await postCart(data, config);
    if (response.status === 200) {
      router.push('/cart');
    } else if (response.status === 401 || response.status === 400) {
      router.push('/signin');
    } else {
      setError({ isError: true, message: response.data.message });
      setShowAlert(true);
    }
  };

  if (productError && productError.status >= 500)
    return <Error statusCode={productError.status} title={productError.message} />;

  return (
    <Layout
      user={user}
      route="detail-product"
      head={{
        title: 'Detail Product | Waysbucks Coffee',
        description: 'Waysbucks detail product coffee',
      }}>
      {!product && !productError ? (
        <Loading />
      ) : productError && productError.status === 404 ? (
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
        <div className="product">
          {error.isError && (
            <Alert
              isOpen={showAlert}
              severity="error"
              position={{
                bottom: 35,
                right: 35,
              }}
              onClose={onCloseAlert}>
              {error.message}
            </Alert>
          )}
          <div className="product-img">
            {product?.payload.image && (
              <Image
                src={product?.payload.image as string}
                alt={product?.payload.name}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
                priority
              />
            )}
            {!product?.payload.image && (
              <Image
                src={ProductPlaceholder}
                alt={product?.payload.name}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
                priority
              />
            )}
          </div>
          <div className="product-info">
            <p className="name">{product?.payload.name}</p>
            <p className="desc">{product?.payload.description}</p>
            <p className="price">Price: {currencyFormat(product?.payload.price as number)}</p>
            <p className="text-2xl font-bold">Topping</p>
            <ListToppings onChange={onToppingChecked} />
            <div className="flex justify-between">
              <p className="total">Total:</p>
              <p className="total">{currencyFormat(total)}</p>
            </div>
            <Button
              variant="contained"
              color="primary"
              className="w-full"
              onClick={() => onAddToCart(product?.payload.id)}>
              Add To Cart
            </Button>
          </div>
        </div>
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

  if (data && data.payload) {
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
