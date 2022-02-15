import { memo } from 'react';

interface Props {
  serviceFee: string;
  subtotal: string;
  total: string;
}
export const CartSubtotal = memo(function CartSubtotal({ serviceFee, subtotal, total }: Props) {
  return (
    <div className="cart-subtotal">
      <div className="list">
        <p>Subtotal</p>
        <p>{subtotal}</p>
      </div>
      <div className="list">
        <p>Service Fee</p>
        <p>{serviceFee}</p>
      </div>
      <hr className="divider" />
      <div className="list text-primary font-bold">
        <p className="text-xl">Total</p>
        <p className="text-xl">{total}</p>
      </div>
    </div>
  );
});
