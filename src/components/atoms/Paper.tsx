import type { CSSProperties, ReactNode } from 'react';
import { memo } from 'react';

interface Props extends CSSProperties {
  children?: ReactNode;
}

export const Paper = memo(function Paper({ children, ...styleProps }: Props) {
  return (
    <div style={styleProps} className="paper">
      {children}
    </div>
  );
});
