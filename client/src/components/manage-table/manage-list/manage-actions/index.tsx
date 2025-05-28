import React from 'react';
import { useNavigate } from 'react-router';

import { Icon } from '../../../ui';
import styles from './manage-actions.module.scss';

interface Props {
  viewUrl: string;
  editUrl: string;
  removeHandler?: VoidFunction;
}

export const ManageActions: React.FC<Props> = ({ viewUrl, editUrl, removeHandler }) => {
  const navigate = useNavigate();

  const goToUrl = (url: string) => () => {
    navigate(url);
  };

  return (
    <div className={styles.actions}>
      {viewUrl && (
        <button onClick={goToUrl(viewUrl)}>
          <Icon name="LuExternalLink" />
        </button>
      )}
      {editUrl && (
        <button onClick={goToUrl(editUrl)}>
          <Icon name="LuPencil" />
        </button>
      )}
      {!!removeHandler && (
        <button onClick={removeHandler}>
          <Icon name="LuTrash" />
        </button>
      )}
    </div>
  );
};
