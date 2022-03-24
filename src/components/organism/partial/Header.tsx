import Link from 'next/link';
import { memo } from 'react';

import { signout } from '@/api';
import { AccountIcon, BrandLogo, CartIcon, DashboardIcon, LogoutIcon, MenuIcon } from '@/assets/icons';
import { Avatar, Badge } from '@/components/atoms';
import { MenuItem, MenuList } from '@/components/atoms/menu';
import { Drawer, Dropdown } from '@/components/moleculs';
import { useHeader } from '@/hooks/useHeader';
import type { User } from '@/types';
import { authSignout } from '@/utils';

interface Props {
  user?: User | null;
}
export const HeaderBar = memo(({ user }: Props) => {
  const {
    carts,
    initialName,
    isDrawerOpen,
    isDropdownOpen,
    onCloseDrawer,
    onCloseDropdown,
    onOpenDrawer,
    onOpenDropdown,
  } = useHeader({ user });

  return (
    <header className="app-bar">
      <Link href="/">
        <a className="app-bar-brand" aria-label="back to home">
          <BrandLogo title="Brand Logo" titleId="logo" />
        </a>
      </Link>
      <button tabIndex={0} id="menuButton" className="btn-menu" aria-label="open drawer" onClick={onOpenDrawer}>
        <span></span>
        <MenuIcon className="text-primary w-9 h-9" />
      </button>
      <nav className="app-bar-menu">
        <Link href="/product">
          <a>MENU</a>
        </Link>
        <Link href="#about">
          <a>ABOUT US</a>
        </Link>
      </nav>
      <div className="app-bar-btn">
        {user ? (
          <>
            {!user.is_admin && (
              <Link href="/cart">
                <a>
                  <Badge badgeContent={carts?.length} color="secondary">
                    <CartIcon size={24} />
                  </Badge>
                </a>
              </Link>
            )}
            <div>
              <button
                id="dropdown-button"
                aria-controls="dropdown-menu"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen ? 'true' : undefined}
                role="button"
                tabIndex={0}
                onClick={onOpenDropdown}>
                <Avatar src={user.image} alt="user avatar" width={40} height={40}>
                  {initialName}
                </Avatar>
              </button>
              <Dropdown
                id="dropdown-menu"
                isAdmin={user.is_admin}
                isOpen={isDropdownOpen}
                aria-labelledby="dropdown-button"
                onClose={onCloseDropdown}
                onLogout={signout}
              />
            </div>
          </>
        ) : (
          <>
            <Link href="/signin">
              <a className="btn btn-primary-outlined">Sign in</a>
            </Link>
            <Link href="/signup">
              <a className="btn btn-primary">Sign up</a>
            </Link>
          </>
        )}
      </div>
      <Drawer isOpen={isDrawerOpen} onClose={onCloseDrawer}>
        {user ? (
          <>
            <MenuList>
              <div className="flex flex-col items-center justify-center px-2 py-4">
                <Avatar src={user.image} alt="user avatar" width={65} height={65}>
                  {initialName}
                </Avatar>
                <p className="h3">{user.name}</p>
              </div>
              <Link href="/account/me" passHref>
                <MenuItem tabIndex={0}>
                  <AccountIcon size={24} className="text-primary" />
                  <span>Account</span>
                </MenuItem>
              </Link>
              {user.is_admin && (
                <Link href="/admin/product" passHref>
                  <MenuItem tabIndex={-1}>
                    <DashboardIcon size={24} className="text-primary" />
                    <span>Product</span>
                  </MenuItem>
                </Link>
              )}
              {!user.is_admin && carts && (
                <Link href="/cart" passHref>
                  <MenuItem tabIndex={0}>
                    <Badge badgeContent={carts.length} color="secondary">
                      <CartIcon size={24} />
                    </Badge>
                    <span>Cart</span>
                  </MenuItem>
                </Link>
              )}
              <MenuItem tabIndex={0} onClick={authSignout}>
                <LogoutIcon size={24} className="text-primary" />
                <span>Logout</span>
              </MenuItem>
            </MenuList>
          </>
        ) : (
          <>
            <MenuList>
              <Link href="/product" passHref>
                <MenuItem tabIndex={0}>Products</MenuItem>
              </Link>
              <Link href="#store" passHref>
                <MenuItem tabIndex={0}>Store</MenuItem>
              </Link>
            </MenuList>
            <Link href="/signin">
              <a className="btn btn-primary-outlined mx-3">Sign in</a>
            </Link>
            <Link href="/signup">
              <a className="btn btn-primary mx-3">Sign up</a>
            </Link>
          </>
        )}
      </Drawer>
    </header>
  );
});
