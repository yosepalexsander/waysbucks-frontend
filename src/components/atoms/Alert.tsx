import type { HTMLAttributes } from 'react';
import { createRef, memo } from 'react';
import { CSSTransition } from 'react-transition-group';

import { CheckIcon, CloseIcon, ErrorIcon, WarningIcon } from '@/assets/icons';
import styles from '@/components/atoms/alert.module.css';

interface AlertProps extends HTMLAttributes<HTMLElement> {
  isOpen?: boolean;
  severity: 'error' | 'success' | 'warning' | 'info';
  position?: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };
  onClose: () => void;
}

export const Alert = memo(function Alert({ isOpen, severity, children, onClose, ...props }: AlertProps) {
  const nodeRef = createRef<HTMLDivElement>();

  return (
    <>
      <CSSTransition
        in={isOpen}
        timeout={500}
        classNames={{
          appear: styles.alert,
          enter: styles.alertEnter,
          enterActive: styles.alertEnterActive,
          exit: styles.alertExit,
          exitActive: styles.alertExitActive,
        }}
        unmountOnExit
        nodeRef={nodeRef}>
        <div
          className={styles.paper}
          ref={nodeRef}
          style={{
            top: props.position?.top,
            right: props.position?.right,
            bottom: props.position?.bottom,
            left: props.position?.left,
          }}>
          <div className="backdrop" onClick={onClose} />
          {severity === 'success' ? (
            <div className={styles.alert + ' ' + styles.alertSuccess}>
              <CheckIcon size={28} />
              <p className={styles.alertMessage}>{children}</p>
              {onClose && (
                <button className="alert-close" onClick={onClose}>
                  <CloseIcon size={28} />
                </button>
              )}
            </div>
          ) : severity === 'error' ? (
            <div className={styles.alert + ' ' + styles.alertError}>
              <ErrorIcon size={28} />
              <p className={styles.alertMessage}>{children}</p>
              {onClose && (
                <button className="alert-close" onClick={onClose}>
                  <CloseIcon size={28} />
                </button>
              )}
            </div>
          ) : severity === 'warning' ? (
            <div className={styles.alert + ' ' + styles.alertWarning}>
              <WarningIcon size={28} />
              <p className={styles.alertMessage}>{children}</p>
              {onClose && (
                <button className="alert-close" onClick={onClose}>
                  <CloseIcon size={28} />
                </button>
              )}
            </div>
          ) : (
            <div className={styles.alert + ' ' + styles.alertInfo}>
              <CheckIcon size={28} />
              <p className={styles.alertMessage}>{children}</p>
              {onClose && (
                <button className={styles.alertClose} onClick={onClose}>
                  <CloseIcon size={28} />
                </button>
              )}
            </div>
          )}
        </div>
      </CSSTransition>
    </>
  );
});
