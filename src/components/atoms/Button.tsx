import type { ButtonHTMLAttributes } from 'react';
import { Fragment, memo } from 'react';

import { Spinner } from '@/assets/icons';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
  size?: 'sm' | 'md' | 'lg';
  color?: 'secondary' | 'primary' | 'danger' | 'warning';
  variant: 'contained' | 'outlined' | 'unstyled';
  isDisabled?: boolean;
  isLoading?: boolean;
}

export const Button = memo(
  ({ size, color, variant, isDisabled, isLoading, children, className, ...props }: ButtonProps) => {
    const btnSize = size ?? 'md';
    const btnColor = color ?? 'primary';

    return (
      <Fragment>
        {variant === 'contained' ? (
          <button
            className={`btn btn-${btnColor} btn-${btnSize}${className ? ` ${className}` : ''}`}
            disabled={isDisabled || isLoading}
            {...props}>
            {isLoading && <Spinner width="24" height="24" className="stroke-white" />}
            <div className="text">{children}</div>
          </button>
        ) : (
          <button
            className={`btn btn-${btnColor}-${variant} btn-${btnSize}${className ? ` ${className}` : ''}`}
            disabled={isDisabled || isLoading}
            {...props}>
            {isLoading && <Spinner width="24" height="24" className="stroke-white" />}
            <div className="text">{children}</div>
          </button>
        )}
      </Fragment>
    );
  },
);
