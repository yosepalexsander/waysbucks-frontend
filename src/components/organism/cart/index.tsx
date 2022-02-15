import type { ChangeEvent } from 'react';
import { memo, useCallback, useMemo, useState } from 'react';
import useSWRImmutable from 'swr/immutable';

import { deleteCart, getAddress, getCarts, postTransaction, updateCart } from '@/api';
import { Alert, Button } from '@/components/atoms';
import { ListAddressesItem } from '@/components/moleculs/cart';
import { useDisclose } from '@/hooks/useDisclose';
import { createJSONRequestConfig } from '@/lib/axios';
import type {
  Address,
  AlertState,
  Cart,
  CommonResponse,
  OrderRequest,
  PostTransactionResponse,
  TransactionRequest,
  User,
} from '@/types';
import { currencyFormat } from '@/utils';

import { CartEmpty } from './CartEmpty';
import { CartItem } from './CartItem';
import { CartSkeleton } from './CartSkeleton';
import { CartSubtotal } from './CartSubtotal';

interface Props {
  user?: User | null;
}

export const Carts = memo(function Cart({ user }: Props) {
  const { isOpen, onClose, onOpen } = useDisclose();
  const [status, setStatus] = useState<AlertState>({
    message: '',
    status: 'success',
  });
  const [selectedAddress, setSelectedAddress] = useState<Address>();

  const {
    data: cartData,
    error,
    mutate,
  } = useSWRImmutable<Cart[] | undefined>('/carts', getCarts, {
    onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
      if (error?.status === 404) return;
      if (retryCount >= 5) return;
      setTimeout(() => revalidate({ retryCount }), 5000);
    },
  });
  const { data: address, error: addressError } = useSWRImmutable<Address[] | undefined, Record<string, any>>(
    `/address/${user?.id}`,
    getAddress,
    {
      onErrorRetry: (error, _key, _config, _revalidate, _revalidateOpts) => {
        if (error?.status === 404) return;
      },
    },
  );

  const carts = useMemo(() => {
    let data: Cart[] = [];

    if (!cartData) {
      return data;
    }

    data = cartData.slice(0);

    return data;
  }, [cartData]);

  const subtotal = useMemo(() => {
    let data: number = 0;

    if (!cartData) {
      return data;
    }

    data = cartData.reduce((acc, curr) => {
      return acc + curr.price;
    }, 0);

    return data;
  }, [cartData]);

  const serviceFee = subtotal * 0.05;
  const total = subtotal + serviceFee;

  const onSelectAddress = useCallback((e: ChangeEvent<HTMLInputElement>, item: Address) => {
    if (e.target.checked) {
      setSelectedAddress(item);
    } else {
      setSelectedAddress(undefined);
    }
  }, []);

  const handlePayment = async () => {
    if (!selectedAddress) {
      setStatus({
        status: 'warning',
        message: 'Please select address',
      });

      onOpen();
      return;
    }

    const orderReq: OrderRequest[] =
      carts.map((item) => {
        const order: OrderRequest = {
          product_id: item.product.id,
          topping_id: item.toppings.map((topping) => topping.id),
          qty: item.qty,
          price: item.price,
        };
        return order;
      }) || [];

    const transactionReq: TransactionRequest = {
      name: selectedAddress?.name || '',
      email: user?.email || '',
      address: selectedAddress?.address || '',
      postal_code: selectedAddress?.postal_code || 0,
      phone: selectedAddress?.phone || '',
      city: selectedAddress?.city || '',
      status: 'pending',
      total: total,
      service_fee: serviceFee,
      orders: orderReq,
    };

    try {
      const config = createJSONRequestConfig({
        'Content-Type': 'application/json',
      });
      const response = await postTransaction<PostTransactionResponse>(transactionReq, config);
      const { payload } = response.data;

      if (!payload.token) {
        setStatus({
          status: 'error',
          message: 'Midtrans Error',
        });
        onOpen();
        return;
      }

      window.snap.pay(payload.token, {
        onSuccess: function () {
          console.log('success');
          setStatus({
            status: 'success',
            message: 'Payment success!! Your order will be processed immediately',
          });
          onOpen();
          setTimeout(() => {
            mutate();
          }, 1500);
        },
        onPending: function (result: any) {
          console.log(result);
        },
        onError: function (result: any) {
          console.log(result);
          setStatus({
            status: 'success',
            message: 'Payment failed!',
          });
          onOpen();
        },
        onClose: function () {
          console.log('customer closed the popup without finishing the payment');
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleMutationUpdate = useCallback(
    async (cart: Cart) => {
      const idx = carts.indexOf(cart);
      carts[idx] = cart;

      await mutate(carts, false);
    },
    [carts, mutate],
  );

  const handleIncreaseQty = useCallback(
    async (cart: Cart) => {
      try {
        const qty = cart.qty + 1;
        const price = cart.price + cart.price / cart.qty;
        const data: Record<string, any> = {
          qty: qty,
          price: price,
        };
        const config = createJSONRequestConfig();
        const updatedCart: Cart = { ...cart, price, qty };

        await updateCart<CommonResponse>(cart.id, data, config);
        await handleMutationUpdate(updatedCart);
      } catch (error) {
        console.log(error);
      }
    },
    [handleMutationUpdate],
  );

  const handleDecreaseQty = useCallback(
    async (cart: Cart) => {
      const qty = cart.qty > 1 ? cart.qty - 1 : cart.qty;

      if (cart.qty != qty) {
        const price = cart.price - cart.price / cart.qty;
        try {
          const data: Record<string, any> = {
            qty: qty,
            price: price,
          };
          const config = createJSONRequestConfig({
            'Content-Type': 'application/json',
          });
          const updatedCart: Cart = { ...cart, price, qty };

          await updateCart<CommonResponse>(cart.id, data, config);
          await handleMutationUpdate(updatedCart);
        } catch (error) {
          console.log(error);
        }
      }
    },
    [handleMutationUpdate],
  );

  const handleDeleteCart = useCallback(
    async (id: number) => {
      try {
        await deleteCart<CommonResponse>(id);
        const updatedCart = carts.filter((item) => item.id != id) || [];

        await mutate(updatedCart, false);
      } catch (error) {
        console.log(error);
      }
    },
    [carts, mutate],
  );

  if (!cartData && !error) return <CartSkeleton />;

  return (
    <div>
      {error || cartData?.length == 0 ? (
        <CartEmpty />
      ) : (
        <>
          <div className="cart-container flex-container">
            <div className="flex-item">
              <Alert
                isOpen={isOpen}
                severity={status.status}
                onClose={onClose}
                position={{
                  bottom: 35,
                  left: 35,
                }}>
                {status.message}
              </Alert>
              <p className="font-medium text-xl">Review Your Order</p>
              <hr className="divider" />
              <div className="cart-list">
                {cartData?.map((cart) => (
                  <CartItem
                    key={cart.id}
                    item={cart}
                    onDecreaseQty={handleDecreaseQty}
                    onDeleteCart={handleDeleteCart}
                    onIncreaseQty={handleIncreaseQty}
                  />
                ))}
              </div>
              <hr className="divider" />
              <CartSubtotal
                subtotal={currencyFormat(subtotal)}
                serviceFee={currencyFormat(serviceFee)}
                total={currencyFormat(total)}
              />
            </div>
            {!address && !addressError ? (
              <div>
                <p>loading address...</p>
              </div>
            ) : (
              <div className="flex-item">
                <p className="font-medium text-xl">Where will the products be sent to?</p>
                <hr className="divider mb-2" />
                {address && (
                  <>
                    {address.map((item, index) => (
                      <ListAddressesItem key={index} item={item} onSelect={onSelectAddress} />
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
          <div className="flex justify-end mt-5 px-2 py-2">
            <Button onClick={handlePayment} color="primary" variant="contained" className="w-full sm:w-3/12">
              Pay
            </Button>
          </div>
        </>
      )}
    </div>
  );
});
