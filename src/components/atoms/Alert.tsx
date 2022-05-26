import type { HTMLAttributes } from 'react';
import { createRef, memo, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';

import { CheckIcon, CloseIcon, ErrorIcon, WarningIcon } from '@/assets/icons';
import styles from '@/components/atoms/alert.module.css';

interface AlertProps extends HTMLAttributes<HTMLElement> {
  isOpen: boolean;
  severity?: 'error' | 'success' | 'warning' | 'info';
  duration?: number;
  position?: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };
  onClose: () => void;
}

export const Alert = memo(({ isOpen, severity, duration = 3000, children, onClose, ...props }: AlertProps) => {
  const nodeRef = createRef<HTMLDivElement>();

  const handleAutoClose = useCallback(() => {
    if (!isOpen) {
      return;
    }

    setTimeout(() => {
      onClose();
    }, duration);
  }, [duration, isOpen, onClose]);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      onEntered={handleAutoClose}
      classNames={{
        appear: styles.alert,
        enter: styles.alertEnter,
        enterActive: styles.alertEnterActive,
        exit: styles.alertExit,
        exitActive: styles.alertExitActive,
      }}
      mountOnEnter
      unmountOnExit>
      <div
        ref={nodeRef}
        className={styles.paper}
        style={{
          top: props.position?.top,
          right: props.position?.right,
          bottom: props.position?.bottom,
          left: props.position?.left,
        }}>
        {severity === 'success' ? (
          <div className={styles.alert + ' ' + styles.alertSuccess}>
            <CheckIcon size={28} />
            <p className={styles.alertMessage}>{children}</p>
          </div>
        ) : severity === 'error' ? (
          <div className={styles.alert + ' ' + styles.alertError}>
            <ErrorIcon size={28} />
            <p className={styles.alertMessage}>{children}</p>
          </div>
        ) : severity === 'warning' ? (
          <div className={styles.alert + ' ' + styles.alertWarning}>
            <WarningIcon size={28} />
            <p className={styles.alertMessage}>{children}</p>
          </div>
        ) : severity === 'info' ? (
          <div className={styles.alert + ' ' + styles.alertInfo}>
            <CheckIcon size={28} />
            <p className={styles.alertMessage}>{children}</p>
            <button className={styles.alertClose}>
              <CloseIcon size={28} />
            </button>
          </div>
        ) : null}
      </div>
    </CSSTransition>
  );
});
