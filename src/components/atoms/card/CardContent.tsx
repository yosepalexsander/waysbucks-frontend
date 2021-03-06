import type { ReactNode } from 'react';
import { memo } from 'react';

interface Props {
  children?: ReactNode;
}

export const CardContent = memo(({ children }: Props) => {
  return <div className="p-4">{children}</div>;
});
