import { memo } from 'react';

import { Paper } from '@/components/atoms';
import { CardContent, CardMedia } from '@/components/atoms/card';
import style from '@/components/moleculs/card.module.css';
import type { Product } from '@/types';

interface ProductItemProps {
  item: Product;
}

export const ProductItem = memo(({ item }: ProductItemProps) => {
  const price = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price);
  return (
    <div className={style.card}>
      <Paper width="100%" backgroundColor="#FEE2E2">
        <CardMedia src={item.image} height={250} alt={item.name} />
        <CardContent>
          <p className={style.cardTitle}>{item.name}</p>
          <p className={style.cardBody}>{price}</p>
        </CardContent>
      </Paper>
    </div>
  );
});
