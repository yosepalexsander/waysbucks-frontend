import type { ReactNode } from 'react';
import { memo, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

interface Props {
  isOpen: boolean;
  children?: ReactNode;
  onClose(): void;
}

export const Drawer = memo(function Drawer({ isOpen, children, onClose }: Props) {
  const nodeRef = useRef(null);
  return (
    <>
      <CSSTransition nodeRef={nodeRef} in={isOpen} timeout={300} classNames="drawer" unmountOnExit>
        <div className="drawer" ref={nodeRef}>
          <span className="backdrop" onClick={onClose}></span>
          <div className="drawer-paper">{children}</div>
        </div>
      </CSSTransition>
    </>
  );
});
