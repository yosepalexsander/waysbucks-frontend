import Image from 'next/image';
import { memo, useCallback } from 'react';

import { DeleteIcon, MinusIcon, PlusIcon } from '@/assets/icons';
import type { Cart } from '@/types';
import { currencyFormat } from '@/utils';

interface Props {
  item: Cart;
  onDecreaseQty: (cart: Cart) => void;
  onDeleteCart: (id: number) => void;
  onIncreaseQty: (cart: Cart) => void;
}

export const CartItem = memo(({ item, onDecreaseQty, onDeleteCart, onIncreaseQty }: Props) => {
  const toppings = item.toppings.map((item) => item.name).join(', ');

  const handleClickDelete = useCallback(() => {
    onDeleteCart(item.id);
  }, [item.id, onDeleteCart]);

  const handleClickDecreaseQty = useCallback(() => {
    onDecreaseQty(item);
  }, [item, onDecreaseQty]);

  const handleClickIncreaseQty = useCallback(() => {
    onIncreaseQty(item);
  }, [item, onIncreaseQty]);

  return (
    <div className="cart-item">
      <div className="img-container cart-img">
        <Image
          src={item.product.image}
          alt={item?.product.name}
          layout="responsive"
          width={50}
          height={50}
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <div className="cart-info flex-1">
        <p className="product-name">{item.product.name}</p>
        <p className="topping">
          Topping: <span className="text-primary">{toppings || 'no topping'}</span>
        </p>
      </div>
      <div className="cart-info items-end">
        <p>{currencyFormat(item.price)}</p>
        <div className="qty">
          <DeleteIcon size="2rem" onClick={handleClickDelete} />
          <MinusIcon size="1.25rem" className="counter" onClick={handleClickDecreaseQty} />
          <p className="mx-3">{item.qty}</p>
          <PlusIcon size="1.25rem" className="counter" onClick={handleClickIncreaseQty} />
        </div>
      </div>
    </div>
  );
});
