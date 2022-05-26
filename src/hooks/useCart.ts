import type { ChangeEvent } from 'react';
import { useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';

import { deleteCart, getAddress, getCarts, postTransaction, updateCart } from '@/api';
import type { Address, Cart, OrderRequest, TransactionRequest, User } from '@/types';

import { useAlert } from './useAlert';

export const useCart = (user?: User | null) => {
  const { alert, handleCloseAlert, handleOpenAlert } = useAlert();
  const [selectedAddress, setSelectedAddress] = useState<Address>();

  const {
    data: cartData,
    error: cartError,
    mutate: cartMutation,
  } = useSWR<Cart[] | undefined>('/carts', getCarts, {
    onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
      if (error?.status === 404) return;
      if (retryCount >= 5) return;
      setTimeout(() => revalidate({ retryCount }), 5000);
    },
  });
  const { data: addressData, error: addressError } = useSWR<Address[] | undefined>('/address', getAddress, {
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
      handleOpenAlert('warning', 'Please select address');

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
      const response = await postTransaction(transactionReq);
      const { payload } = response;

      if (!payload.token) {
        handleOpenAlert('error', 'Payment failed');

        return;
      }

      window.snap.pay(payload.token, {
        onSuccess: function () {
          handleOpenAlert('success', 'Payment success!! Your order will be processed immediately');

          setTimeout(() => {
            cartMutation();
          }, 1500);
        },
        onPending: function (result: unknown) {
          console.log(result);
        },
        onError: function (result: unknown) {
          console.error(result);
          handleOpenAlert('error', 'Payment failed');
        },
        onClose: function () {
          console.log('customer closed the popup without finishing the payment');
        },
      });
    } catch (error) {
      console.log(error);
    }
  }, [selectedAddress, carts, user?.email, total, serviceFee, handleOpenAlert, cartMutation]);

  const handleMutationUpdate = useCallback(
    async (cart: Cart) => {
      const optimisticData = carts.slice(0);
      const idx = optimisticData.findIndex((item) => item.id === cart.id);
      optimisticData[idx] = cart;

      await cartMutation(
        async (draft) => {
          await updateCart(cart.id, cart);

          return draft;
        },
        { optimisticData, rollbackOnError: true },
      );
    },
    [carts, cartMutation],
  );

  const handleIncreaseQty = useCallback(
    async (cart: Cart) => {
      const qty = cart.qty + 1;
      const price = cart.price + cart.price / cart.qty;
      const updatedCart: Cart = { ...cart, price, qty };

      try {
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
        const updatedCart: Cart = { ...cart, price, qty };

        try {
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
      const optimisticData = carts.filter((item) => item.id != id);

      try {
        await cartMutation(
          async (draft) => {
            await deleteCart(id);

            return draft;
          },
          { optimisticData, rollbackOnError: true },
        );
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
    loadingGet,
    selectedAddress,
    serviceFee,
    subtotal,
    total,
    handleCloseAlert,
    handleDecreaseQty,
    handleDeleteCart,
    handleIncreaseQty,
    handlePayment,
    handleSelectAddress,
  };
};
