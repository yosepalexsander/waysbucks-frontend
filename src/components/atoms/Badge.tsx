import type { ReactNode } from 'react';
import { memo } from 'react';

import style from '@/components/atoms/badge.module.css';

interface Props {
  badgeContent?: number | string;
  color: 'secondary' | 'primary';
  children?: ReactNode;
}

export const Badge = memo(({ color, badgeContent, children }: Props) => {
  return (
    <span className={style.badge}>
      {children}
      {color === 'primary' ? (
        <span className={style.badgeContent + ' ' + style.primary}>
          {badgeContent && badgeContent > 0 ? badgeContent : null}
        </span>
      ) : (
        <span className={style.badgeContent + ' ' + style.secondary}>
          {badgeContent && badgeContent > 0 ? badgeContent : null}
        </span>
      )}
    </span>
  );
});
