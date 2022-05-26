import type { InputHTMLAttributes, ReactNode } from 'react';
import { memo } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement>, 'disabled'> {
  hintText?: string;
  isDisabled?: boolean;
  label?: string;
  multiline?: boolean;
  leftIcon?: ReactNode;
}

export const Input = memo(({ hintText, isDisabled, label, multiline, className, id, ...props }: InputProps) => {
  return (
    <div className={'form-control-root' + (multiline ? ' h-20' : 'h-10')}>
      {multiline && (
        <textarea
          className={className ? `form-control-input ${className}` : 'form-control-input'}
          disabled={isDisabled}
          {...props}>
          {hintText}
        </textarea>
      )}
      {!multiline && (
        <input
          className={className ? `form-control-input ${className}` : 'form-control-input'}
          disabled={isDisabled}
          {...props}
        />
      )}
      {label && (
        <label className="form-label" htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
});
