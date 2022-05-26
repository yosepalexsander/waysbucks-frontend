import type { ChangeEvent } from 'react';
import { memo } from 'react';

import { Search } from '@/assets/icons';

interface InputSearchProps {
  placeholder?: string;
  isDisabled?: boolean;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputSearch = memo(({ placeholder, isDisabled, onSearch }: InputSearchProps) => {
  return (
    <div className="input-search">
      <Search title="search icon" titleId="src-icon" />
      <input
        id="search"
        name="search"
        type="text"
        placeholder={placeholder}
        disabled={isDisabled}
        onChange={onSearch}
      />
    </div>
  );
});
