import type { MutableRefObject, ReactNode } from 'react';
import { forwardRef, memo } from 'react';

import styles from './menu.module.css';

interface MenuItemProps {
  href?: string;
  tabIndex?: number;
  children?: ReactNode;
  onClick?: () => void;
}

export const MenuItem = memo(
  forwardRef(({ href, tabIndex, children, onClick }: MenuItemProps, ref) => {
    return (
      <>
        {href ? (
          <a
            ref={ref as MutableRefObject<HTMLAnchorElement>}
            href={href}
            role="menuitem"
            tabIndex={tabIndex}
            className={styles.menuItem}
            onClick={onClick}>
            {children}
          </a>
        ) : (
          <li
            ref={ref as MutableRefObject<HTMLLIElement>}
            role="menuitem"
            tabIndex={tabIndex}
            className={styles.menuItem}
            onClick={onClick}>
            {children}
          </li>
        )}
      </>
    );
  }),
);
