import type { ChangeEvent } from 'react';
import { useCallback, useMemo, useState } from 'react';
import useSWRImmutable from 'swr/immutable';

import { deleteCart, getAddress, getCarts, postTransaction, updateCart } from '@/api';
import { createJSONRequestConfig } from '@/lib/axios';
import type { Address, AlertState, Cart, OrderRequest, TransactionRequest, User } from '@/types';

import { useDisclose } from './useDisclose';

export const useCart = (user?: User | null) => {
  const { isOpen, onClose, onOpen } = useDisclose();
  const [alert, setAlert] = useState<AlertState>({
    message: '',
    status: 'success',
  });
  const [selectedAddress, setSelectedAddress] = useState<Address>();

  const {
    data: cartData,
    error: cartError,
    mutate: cartMutation,
  } = useSWRImmutable<Cart[] | undefined>('/carts', getCarts, {
    onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
      if (error?.status === 404) return;
      if (retryCount >= 5) return;
      setTimeout(() => revalidate({ retryCount }), 5000);
    },
  });
  const { data: addressData, error: addressError } = useSWRImmutable<Address[] | undefined>('/address', getAddress, {
    onErrorRetry: (error, _key, _config, _revalidate, _revalidateOpts) => {
      if (error?.status === 404) return;
    },
  });

  const addresses = useMemo(() => {
    let data: Address[] = [];

    if (!addressData) {
      return data;
    }

    data = addressData.slice(0);

    return data;
  }, [addressData]);

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

    data = carts.reduce((acc, curr) => {
      return acc + curr.price;
    }, 0);

    return data;
  }, [carts]);

  const serviceFee = subtotal * 0.05;
  const total = subtotal + serviceFee;

  const handleSelectAddress = useCallback((e: ChangeEvent<HTMLInputElement>, item: Address) => {
    if (e.target.checked) {
      setSelectedAddress(item);
    } else {
      setSelectedAddress(undefined);
    }
  }, []);

  const handlePayment = useCallback(async () => {
    if (!selectedAddress) {
      setAlert({
        status: 'warning',
        message: 'Please select address',
      });

      onOpen();
      return;
    }

    const orderReq: OrderRequest[] = carts.map((item) => {
      const order: OrderRequest = {
        product_id: item.product.id,
        topping_id: item.toppings.map((topping) => topping.id),
        qty: item.qty,
        price: item.price,
      };
      return order;
    });

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
      const response = await postTransaction(transactionReq, config);
      const { payload } = response;

      if (!payload.token) {
        setAlert({
          status: 'error',
          message: 'Midtrans Error',
        });
        onOpen();
        return;
      }

      window.snap.pay(payload.token, {
        onSuccess: function () {
          console.log('success');
          setAlert({
            status: 'success',
            message: 'Payment success!! Your order will be processed immediately',
          });
          onOpen();
          setTimeout(() => {
            cartMutation();
          }, 1500);
        },
        onPending: function (result: unknown) {
          console.log(result);
        },
        onError: function (result: unknown) {
          console.log(result);
          setAlert({
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
  }, [carts, cartMutation, onOpen, selectedAddress, serviceFee, total, user?.email]);

  const handleMutationUpdate = useCallback(
    async (cart: Cart) => {
      const idx = carts.findIndex((item) => item.id === cart.id);
      carts[idx] = cart;

      await cartMutation(carts, false);
    },
    [carts, cartMutation],
  );

  const handleIncreaseQty = useCallback(
    async (cart: Cart) => {
      try {
        const qty = cart.qty + 1;
        const price = cart.price + cart.price / cart.qty;
        const data: Record<string, unknown> = {
          qty: qty,
          price: price,
        };
        const config = createJSONRequestConfig();
        const updatedCart: Cart = { ...cart, price, qty };

        await updateCart(cart.id, data, config);
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
          const data: Record<string, unknown> = {
            qty: qty,
            price: price,
          };
          const config = createJSONRequestConfig({
            'Content-Type': 'application/json',
          });
          const updatedCart: Cart = { ...cart, price, qty };

          await updateCart(cart.id, data, config);
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
        await deleteCart(id);
        const updatedCart = carts.filter((item) => item.id != id) || [];

        await cartMutation(updatedCart, false);
      } catch (error) {
        console.log(error);
      }
    },
    [carts, cartMutation],
  );

  const loadingGet = (!cartData && !cartError) || (!addressData && !addressError);

  return {
    addresses,
    alert,
    carts,
    isOpen,
    loadingGet,
    serviceFee,
    subtotal,
    total,
    handleDecreaseQty,
    handleDeleteCart,
    handleIncreaseQty,
    handlePayment,
    handleSelectAddress,
    onClose,
  };
};
