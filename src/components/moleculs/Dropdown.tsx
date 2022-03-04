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

export const Dropdown = memo(function Dropdown({ id, isAdmin, isOpen, onClose, onLogout, ...props }: Props) {
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
      <div id={id} role="presentation" className={styles.dropdown} ref={nodeRef} {...props}>
        <div aria-hidden="true" className="backdrop" onClick={onClose} />
        <Paper width={150} maxWidth="100%">
          <MenuList>
            {!isAdmin && (
              <MenuItem tabIndex={0}>
                <Link href="/account/me">
                  <a>
                    <div>
                      <AccountIcon size={24} className="text-primary" />
                    </div>
                    <span>Account</span>
                  </a>
                </Link>
              </MenuItem>
            )}
            {isAdmin && (
              <MenuItem tabIndex={-1}>
                <Link href="/admin/product">
                  <a>
                    <div>
                      <DashboardIcon size={24} className="text-primary" />
                    </div>
                    <span>Product</span>
                  </a>
                </Link>
              </MenuItem>
            )}
            <MenuItem tabIndex={-1}>
              <button onClick={onLogout}>
                <div>
                  <LogoutIcon size={24} className="text-primary" />
                </div>
                <p>Logout</p>
              </button>
            </MenuItem>
          </MenuList>
        </Paper>
      </div>
    </CSSTransition>
  );
});
