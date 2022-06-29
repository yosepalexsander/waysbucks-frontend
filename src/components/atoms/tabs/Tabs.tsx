import React from 'react';

import type { TabProps } from './Tab';
import { Tab } from './Tab';

interface TabsProps extends React.AriaAttributes {
  children: React.ReactNode;
  value: number;
  className?: string;
  onChange: (newValue: number) => void;
}

export const Tabs = React.memo(({ children, onChange, className, value, ...rest }: TabsProps) => {
  return (
    <div className={className ? `${className} h-full` : ''}>
      <div className="tabs" role="tablist" {...rest}>
        {React.Children.map(children, (child, index) => {
          const item = child as React.ReactElement<React.PropsWithChildren<TabProps>>;

          if (item.type === Tab) {
            const isActive = index === value;
            const onClick = () => {
              onChange(index);
              item.props.onClick?.();
            };
            return React.cloneElement(item, { isActive, onClick, 'aria-selected': isActive ? true : false });
          } else {
            return child;
          }
        })}
        <div className="slider" role="presentation" />
      </div>
    </div>
  );
});
