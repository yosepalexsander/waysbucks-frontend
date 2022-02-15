import type { ReactNode } from 'react';
import { createRef, memo } from 'react';
import { CSSTransition } from 'react-transition-group';

interface Props {
  isOpen: boolean;
  children?: ReactNode;
  onClose: () => void;
}

export const Modal = memo(function Modal({ isOpen, children, onClose }: Props) {
  const nodeRef = createRef<HTMLDivElement>();
  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit nodeRef={nodeRef}>
      <div className="modal" ref={nodeRef}>
        <span className="backdrop" onClick={onClose}></span>
        {children}
      </div>
    </CSSTransition>
  );
});
