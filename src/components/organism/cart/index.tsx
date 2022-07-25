import { FormikProvider } from 'formik';
import dynamic from 'next/dynamic';
import { memo } from 'react';

import { AddLocationIcon, PlusIcon } from '@/assets/icons';
import { Alert, Button } from '@/components/atoms';
import { ListAddressesItem } from '@/components/moleculs/cart';
import { useAddress } from '@/hooks/account/useAddress';
import { useCart } from '@/hooks/useCart';
import type { ModalFormAddressProps, ModalMapProps, User } from '@/types';
import { currencyFormat } from '@/utils';

import { CartEmpty } from './CartEmpty';
import { CartItem } from './CartItem';
import { CartSkeleton } from './CartSkeleton';
import { CartSubtotal } from './CartSubtotal';

const ModalFormAddress = dynamic<ModalFormAddressProps>(
  () => import('@/components/organism/modal/ModalFormAddress').then((mod) => mod.ModalFormAddress),
  {
    ssr: false,
  },
);
const ModalMap = dynamic<ModalMapProps>(
  () => import('@/components/organism/modal/ModalMap').then((mod) => mod.ModalMap),
  {
    ssr: false,
  },
);

interface Props {
  user?: User;
}

export const Carts = memo(({ user }: Props) => {
  const {
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
  } = useCart(user);
  const {
    addresses,
    alert: alertAddress,
    isModalFormAddressOpen,
    isModalMapOpen,
    loadingGet: loadingGetAddress,
    methods: formAddressProvider,
    handleCloseAlert: handleCloseAlertAddress,
    handleCloseModalFormAddress,
    handleOpenModalNewAddress,
    handleSelectLocation,
    handleUpdateAddress,
    onCloseModalMap,
    onOpenModalMap,
  } = useAddress();

  if (loadingGet || loadingGetAddress) return <CartSkeleton />;

  return (
    <div>
      {carts.length < 1 ? (
        <CartEmpty />
      ) : (
        <>
          <div className="cart-container flex-container">
            <div className="flex-item">
              <p className="text-xl font-medium">Review Your Order</p>
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
              <p className="text-xl font-medium">Where will the products be deliver to?</p>
              <hr className="divider mb-2" />
              {addresses.length > 0 ? (
                <>
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
                  <Button
                    variant="unstyled"
                    size="sm"
                    leftIcon={<AddLocationIcon size="1.25rem" />}
                    onClick={handleOpenModalNewAddress}>
                    Create Address
                  </Button>
                </>
              ) : (
                <div className=" flex h-4/5 w-full flex-col items-center justify-center space-y-4">
                  <p>Let&apos;s add an address to make it easier for us to deliver your order</p>
                  <Button size="sm" leftIcon={<PlusIcon size="1.25rem" />} onClick={handleOpenModalNewAddress}>
                    Create Address
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="mt-5 flex justify-end px-2 py-2">
            <Button className="w-full sm:w-3/12" onClick={handlePayment}>
              Pay
            </Button>
          </div>
        </>
      )}
      <Alert
        isOpen={alert.isOpen}
        severity={alert.status}
        onClose={handleCloseAlert}
        position={{
          bottom: 35,
          left: 35,
        }}>
        {alert.message}
      </Alert>
      <Alert
        isOpen={alertAddress.isOpen}
        severity={alertAddress.status}
        onClose={handleCloseAlertAddress}
        position={{
          bottom: 35,
          left: 35,
        }}>
        {alertAddress.message}
      </Alert>
      <FormikProvider value={formAddressProvider}>
        <ModalFormAddress
          isOpen={isModalFormAddressOpen}
          selectedAddress={selectedAddress}
          onClose={handleCloseModalFormAddress}
          onOpenMap={onOpenModalMap}
          onUpdateAddress={handleUpdateAddress}
        />
        <ModalMap isOpen={isModalMapOpen} onClose={onCloseModalMap} onSelectLocation={handleSelectLocation} />
      </FormikProvider>
    </div>
  );
});
