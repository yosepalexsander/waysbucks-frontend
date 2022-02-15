import type { ReactNode } from 'react';
import { memo } from 'react';

import styles from './menu.module.css';

interface MenuItemProps {
  tabIndex?: number;
  children?: ReactNode;
}

export const MenuItem = memo(function MenuItem({ tabIndex, children }: MenuItemProps) {
  return (
    <li className={styles.menuItem} role="menuitem" tabIndex={tabIndex}>
      {children}
    </li>
  );
});
