import type { ButtonHTMLAttributes } from 'react';
import { Fragment, memo } from 'react';

import { Spinner } from '@/assets/icons';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
  size?: 'sm' | 'md' | 'lg';
  color?: 'secondary' | 'primary' | 'danger' | 'warning';
  variant?: 'contained' | 'outlined' | 'unstyled';
  isDisabled?: boolean;
  isLoading?: boolean;
  leftIcon?: JSX.Element;
}

export const Button = memo(
  ({ size, color, variant, isDisabled, isLoading, children, className, leftIcon, ...props }: ButtonProps) => {
    const btnSize = size ?? 'md';
    const btnColor = color ?? 'primary';
    const btnVariant = variant ?? 'contained';

    return (
      <Fragment>
        {btnVariant === 'contained' && (
          <button
            className={`btn btn-${btnColor} btn-${btnSize}${className ? ` ${className}` : ''}`}
            disabled={isDisabled || isLoading}
            {...props}>
            {isLoading && <Spinner width="24" height="24" className="stroke-white" />}
            {leftIcon}
            <div className="text">{children}</div>
          </button>
        )}
        {btnVariant === 'outlined' && (
          <button
            className={`btn btn-${btnColor}-${variant} btn-${btnSize}${className ? ` ${className}` : ''}`}
            disabled={isDisabled || isLoading}
            {...props}>
            {isLoading && <Spinner width="24" height="24" className="stroke-white" />}
            {leftIcon}
            <div className="text">{children}</div>
          </button>
        )}
        {btnVariant === 'unstyled' && (
          <button
            className={`btn btn-${btnSize}${className ? ` ${className}` : ''}`}
            disabled={isDisabled || isLoading}
            {...props}>
            {isLoading && <Spinner width="24" height="24" className="stroke-white" />}
            {leftIcon}
            <div className="text">{children}</div>
          </button>
        )}
      </Fragment>
    );
  },
);
