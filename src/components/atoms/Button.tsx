import type { ButtonHTMLAttributes } from 'react';
import { memo } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: 'secondary' | 'primary' | 'danger' | 'warning';
  variant: 'contained' | 'outlined';
}

export const Button = memo(function Button({ color, variant, children, className, ...props }: ButtonProps) {
  return (
    <>
      {variant === 'contained' ? (
        <>
          {color === 'primary' && (
            <button className={`btn btn-primary ${className}`} {...props}>
              {children}
            </button>
          )}
          {color === 'secondary' && (
            <button className={`btn btn-secondary ${className}`} {...props}>
              {children}
            </button>
          )}
          {color === 'warning' && (
            <button className={`btn btn-warning ${className}`} {...props}>
              {children}
            </button>
          )}
          {color === 'danger' && (
            <button className={`btn btn-danger ${className}`} {...props}>
              {children}
            </button>
          )}
        </>
      ) : (
        <>
          {color === 'primary' && (
            <button className={`btn btn-primary-outlined ${className}`} {...props}>
              {children}
            </button>
          )}
          {color === 'secondary' && (
            <button className={`btn btn-secondary-outlined ${className}`} {...props}>
              {children}
            </button>
          )}
          {color === 'warning' && (
            <button className={`btn btn-warning-outlined ${className}`} {...props}>
              {children}
            </button>
          )}
          {color === 'danger' && (
            <button className={`btn btn-danger-outlined ${className}`} {...props}>
              {children}
            </button>
          )}
        </>
      )}
    </>
  );
});
