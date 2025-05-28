import React from 'react';

import { ManageCreateButton } from './manage-create-button';
import { SearchInput } from '../../ui/search-input';
import styles from './manage-header.module.scss';

interface Props {
  searchTerm: string;
  handleSearch: React.ChangeEventHandler<HTMLInputElement>;
  onClick: VoidFunction;
}

export const ManageHeader: React.FC<Props> = ({ searchTerm, handleSearch, onClick }) => {
  return (
    <div className={styles.header}>
      <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
      <ManageCreateButton onClick={onClick} />
    </div>
  );
};
