import React from 'react';

import { usePagination } from '../../../common/hooks/use-pagination';
import type { ListItem } from './types';

import { ManageListHeader } from './manage-list-header';
import { ManageListItem } from './manage-list-item';
import { Heading, Icon, SkeletonLoader } from '../../ui';
import styles from './manage-list.module.scss';

interface Props {
  isLoading: boolean;
  headerItems: string[];
  listItems: ListItem[];
  handleRemove: (id: string) => void;
}

const itemsPerPage = 5;

export const ManageList: React.FC<Props> = ({
  isLoading,
  headerItems,
  listItems,
  handleRemove,
}) => {
  const { currentPage, startIndex, totalPages, handlePrev, handleNext } = usePagination(
    listItems.length,
    5
  );

  const currentItems = listItems.slice(startIndex, startIndex + itemsPerPage);

  const removeHandler = (id: string) => () => handleRemove(id);

  return (
    <div className="mb-12">
      <ManageListHeader headerItems={headerItems} />
      {isLoading ? (
        <div className={styles.loading}>
          {[...Array(5)].map((_, index) => (
            <SkeletonLoader key={index} className="h-20" />
          ))}
        </div>
      ) : !!currentItems.length ? (
        currentItems.map((item) => (
          <ManageListItem
            key={item.id}
            listItem={item}
            removeHandler={removeHandler(item.id)}
          />
        ))
      ) : (
        <Heading as="h3" className={styles.not_found}>
          The list of heroes is empty. Click on the button above to create a new one.
        </Heading>
      )}
      {!!listItems.length && (
        <div className={styles.pagination}>
          <div className="mt-3">
            {currentPage > 1 && (
              <button onClick={handlePrev} disabled={currentPage === 1}>
                <Icon name="LuCircleArrowLeft" className="w-9 h-9" />
              </button>
            )}
            <span style={{ margin: '0 10px' }}>
              {currentPage} of {totalPages}
            </span>
            {currentPage < totalPages && (
              <button onClick={handleNext} disabled={currentPage === totalPages}>
                <Icon name="LuCircleArrowRight" className="w-9 h-9" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
