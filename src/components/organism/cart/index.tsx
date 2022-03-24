import { memo } from 'react';

import { Alert, Button } from '@/components/atoms';
import { ListAddressesItem } from '@/components/moleculs/cart';
import { useCart } from '@/hooks/useCart';
import type { User } from '@/types';
import { currencyFormat } from '@/utils';

import { CartEmpty } from './CartEmpty';
import { CartItem } from './CartItem';
import { CartSkeleton } from './CartSkeleton';
import { CartSubtotal } from './CartSubtotal';

interface Props {
  user?: User;
}

export const Carts = memo(function Cart({ user }: Props) {
  const {
    addresses,
    alert,
    carts,
    isOpen,
    loadingGet,
    selectedAddress,
    serviceFee,
    subtotal,
    total,
    handleDecreaseQty,
    handleDeleteCart,
    handleIncreaseQty,
    handlePayment,
    handleSelectAddress,
    onClose,
  } = useCart(user);

  if (loadingGet) return <CartSkeleton />;

  return (
    <div>
      {carts.length == 0 ? (
        <CartEmpty />
      ) : (
        <>
          <div className="cart-container flex-container">
            <div className="flex-item">
              <Alert
                isOpen={isOpen}
                severity={alert.status}
                onClose={onClose}
                position={{
                  bottom: 35,
                  left: 35,
                }}>
                {alert.message}
              </Alert>
              <p className="font-medium text-xl">Review Your Order</p>
              <hr className="divider" />
              <div className="cart-list">
                {carts.map((cart) => (
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
            <div className="flex-item">
              <p className="font-medium text-xl">Where will the products be deliver to?</p>
              <hr className="divider mb-2" />
              {addresses && (
                <ul className="address-list flex-container">
                  {addresses.map((item, index) => (
                    <ListAddressesItem
                      key={item.id}
                      index={index}
                      item={item}
                      selectedAddress={selectedAddress}
                      onSelect={handleSelectAddress}
                    />
                  ))}
                </ul>
              )}
            </div>
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
