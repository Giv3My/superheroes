import React from 'react';

import { Icon } from '../../ui/icon';
import styles from './search-input.module.scss';

interface Props extends React.HTMLAttributes<HTMLInputElement> {
  searchTerm: string;
  handleSearch: React.ChangeEventHandler<HTMLInputElement>;
}

export const SearchInput: React.FC<Props> = ({ searchTerm, handleSearch, ...props }) => {
  return (
    <label className={styles.search}>
      <Icon name="LuSearch" className={styles.icon} />
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        {...props}
      />
    </label>
  );
};
