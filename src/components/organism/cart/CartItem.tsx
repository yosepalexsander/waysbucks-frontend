import Image from 'next/image';
import { memo } from 'react';

import { DeleteIcon, MinusIcon, PlusIcon } from '@/assets/icons';
import type { Cart } from '@/types';
import { currencyFormat } from '@/utils';

interface Props {
  item: Cart;
  onDecreaseQty: (cart: Cart) => void;
  onDeleteCart: (id: number) => void;
  onIncreaseQty: (cart: Cart) => void;
}

export const CartItem = memo(function CartItem({ item, onDecreaseQty, onDeleteCart, onIncreaseQty }: Props) {
  const toppings = item.toppings.map((item) => item.name).join(', ');

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
        <p className="topping">Topping: {toppings}</p>
      </div>
      <div className="cart-info items-end">
        <p>{currencyFormat(item.price)}</p>
        <div className="qty">
          <DeleteIcon size="2rem" onClick={() => onDeleteCart(item.id)} />
          <MinusIcon size="1.25rem" className="counter" onClick={() => onDecreaseQty(item)} />
          <p className="mx-3">{item.qty}</p>
          <PlusIcon size="1.25rem" className="counter" onClick={() => onIncreaseQty(item)} />
        </div>
      </div>
    </div>
  );
});
