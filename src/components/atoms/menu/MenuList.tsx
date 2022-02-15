import type { ReactNode } from 'react';
import { memo } from 'react';

import styles from './menu.module.css';

interface MenuProps {
  children?: ReactNode;
}

export const MenuList = memo(function MenuList({ children }: MenuProps) {
  return (
    <ul className={styles.menuList} role="menu" tabIndex={-1}>
      {children}
    </ul>
  );
});

MenuList.displayName = 'MenuList';
