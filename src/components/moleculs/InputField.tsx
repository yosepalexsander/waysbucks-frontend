import { useField } from 'formik';
import { memo } from 'react';

import { Input } from '@/components/atoms';

interface Props {
  isDisabled?: boolean;
  name: string;
  placeholder?: string;
  multiline?: boolean;
  type?: string;
}
export const InputField = memo(({ isDisabled, name, placeholder, multiline, type = 'text' }: Props) => {
  const [{ value, onBlur, onChange }, meta, _helpers] = useField(name);

  return (
    <div className="form-group">
      <Input
        name={name}
        placeholder={placeholder}
        value={value ?? ''}
        isDisabled={isDisabled}
        type={type}
        multiline={multiline}
        onBlur={onBlur}
        onChange={onChange}
      />
      {meta.error ? (
        <div aria-live="polite" className="ml-1 h-3 text-sm text-red-600">
          {meta.error}
        </div>
      ) : (
        <div className="h-3" />
      )}
    </div>
  );
});
