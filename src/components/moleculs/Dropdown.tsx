import Link from 'next/link';
import { createRef, memo } from 'react';
import { CSSTransition } from 'react-transition-group';

import { AccountIcon, DashboardIcon, LogoutIcon } from '@/assets/icons';
import { Paper } from '@/components/atoms';
import { MenuItem, MenuList } from '@/components/atoms/menu';
import styles from '@/components/moleculs/dropdown.module.css';

interface Props {
  id?: string;
  isAdmin?: boolean;
  isOpen: boolean;
  ['aria-labelledby']?: string;
  onClose: () => void;
  onLogout: () => void;
}

export const Dropdown = memo(({ id, isAdmin, isOpen, onClose, onLogout, ...props }: Props) => {
  const nodeRef = createRef<HTMLDivElement>();

  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames={{
        appear: styles.dropdown,
        enter: styles.dropdownEnter,
        enterActive: styles.dropdownEnterActive,
        exit: styles.dropdownExit,
        exitActive: styles.dropdownExitActive,
      }}
      unmountOnExit
      nodeRef={nodeRef}>
      <div ref={nodeRef} id={id} className={styles.dropdown} role="presentation" {...props}>
        <div aria-hidden="true" className="backdrop" onClick={onClose} />
        <Paper width={150} maxWidth="100%">
          <MenuList>
            {!isAdmin ? (
              <Link href="/account/me" passHref>
                <MenuItem tabIndex={0}>
                  <AccountIcon size={24} className="text-primary" />
                  <span>Account</span>
                </MenuItem>
              </Link>
            ) : (
              <Link href="/admin/product" passHref>
                <MenuItem tabIndex={-1}>
                  <DashboardIcon size={24} className="text-primary" />
                  <span>Product</span>
                </MenuItem>
              </Link>
            )}
            <MenuItem tabIndex={-1} onClick={onLogout}>
              <LogoutIcon size={24} className="text-primary" />
              <p>Logout</p>
            </MenuItem>
          </MenuList>
        </Paper>
      </div>
    </CSSTransition>
  );
});
