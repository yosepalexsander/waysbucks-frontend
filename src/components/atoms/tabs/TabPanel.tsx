import type { ReactNode } from 'react';
import { memo } from 'react';

interface TabPanelProps {
  id: string;
  index: number;
  value: number;
  children?: ReactNode;
  className?: string;
  'aria-labelledby': string;
}

export const TabPanel = memo(function Tab({ id, index, value, children, ...rest }: TabPanelProps) {
  return (
    <div role="tabpanel" aria-hidden={value !== index} id={id} {...rest}>
      {value === index && <>{children}</>}
    </div>
  );
});
