import { memo } from 'react';

import { Avatar } from '@/components/atoms';
import type { User } from '@/types';

interface Props {
  user?: User;
}

export const Account = memo(({ user }: Props) => {
  return (
    <section id="accountSummary" className="flex flex-col items-center self-start">
      <Avatar src={user?.image as string} alt="user account img" sizes="lg">
        <p className="text-4xl sm:text-6xl">{user?.name.substring(0, 2).toUpperCase()}</p>
      </Avatar>
      <div className="flex flex-col items-center">
        <p className="h4">{user?.name}</p>
        <p>{user?.email}</p>
      </div>
    </section>
  );
});
