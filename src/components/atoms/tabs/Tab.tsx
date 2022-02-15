import type { AriaAttributes } from 'react';
import { memo } from 'react';

export interface TabProps extends AriaAttributes {
  id: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const Tab = memo(function Tab(props: TabProps) {
  const { id, label, isActive, onClick, ...rest } = props;
  return (
    <button
      id={`${id}`}
      className={'tab' + (isActive ? ' tab-active' : '')}
      role="tab"
      tabIndex={isActive ? 0 : -1}
      onClick={onClick}
      {...rest}>
      {label}
    </button>
  );
});
