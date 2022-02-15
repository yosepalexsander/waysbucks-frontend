import type { ChangeEvent } from 'react';
import { memo } from 'react';

import { Search } from '@/assets/icons';

interface InputSearchProps {
  placeholder?: string;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputSearch = memo(function InputSearch({ placeholder, onSearch }: InputSearchProps) {
  return (
    <div className="input-search">
      <Search title="search icon" titleId="src-icon" />
      <input id="search" name="search" type="text" placeholder={placeholder} onChange={onSearch} />
    </div>
  );
});
