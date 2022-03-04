import type { ButtonHTMLAttributes } from 'react';
import { Fragment, memo } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'secondary' | 'primary' | 'danger' | 'warning';
  variant: 'contained' | 'outlined' | 'unstyled';
}

export const Button = memo(function Button({ color, variant, children, className, ...props }: ButtonProps) {
  return (
    <Fragment>
      {color && variant === 'contained' ? (
        <button className={`btn btn-${color}${className ? ` ${className}` : ''}`} {...props}>
          {children}
        </button>
      ) : color && variant === 'outlined' ? (
        <button className={`btn btn-${color}-outlined${className ? ` ${className}` : ''}`} {...props}>
          {children}
        </button>
      ) : (
        <button className={`btn${className ? ` ${className}` : ''}`} {...props}>
          {children}
        </button>
      )}
    </Fragment>
  );
});
