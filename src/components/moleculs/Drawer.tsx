import type { ReactNode } from 'react';
import { memo, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

interface Props {
  isOpen: boolean;
  children?: ReactNode;
  onClose(): void;
}

export const Drawer = memo(({ isOpen, children, onClose }: Props) => {
  const nodeRef = useRef(null);

  return (
    <CSSTransition nodeRef={nodeRef} in={isOpen} timeout={300} classNames="drawer" unmountOnExit>
      <div ref={nodeRef} className="drawer" role="presentation">
        <span className="backdrop" onClick={onClose}></span>
        <div className="drawer-paper">{children}</div>
      </div>
    </CSSTransition>
  );
});
