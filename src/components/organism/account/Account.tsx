import Image from 'next/image';
import { memo } from 'react';

import type { User } from '@/types';

interface Props {
  user?: User;
}

export const Account = memo(({ user }: Props) => {
  return (
    <section id="account">
      <h1 className="h2 pb-4">My Profile</h1>
      <div className="flex flex-container">
        <div className="account-img flex-item">
          {user?.image ? (
            <Image
              src={user?.image as string}
              alt="user account img"
              layout="responsive"
              width={50}
              height={50}
              className="rounded-md"
              objectFit="cover"
            />
          ) : (
            <p className="account-img-placeholder">{user?.name.substring(0, 2).toUpperCase()}</p>
          )}
        </div>
        <div className="account-info flex-item">
          <div>
            <p className="h4">Name</p>
            <p>{user?.name}</p>
          </div>
          <div>
            <p className="h4">Email</p>
            <p>{user?.email}</p>
          </div>
          <div>
            <p className="h4">Phone</p>
            <p>{user?.phone.replace(/\w{3}$/, 'XXX')}</p>
          </div>
        </div>
      </div>
    </section>
  );
});
