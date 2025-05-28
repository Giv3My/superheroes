import React from 'react';

import { Button } from '../../ui/form';
import { Icon } from '../../ui';

interface Props {
  onClick?: VoidFunction;
}

export const ManageCreateButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <Icon name="LuPlus" className="mr-2 size-4" />
      Create
    </Button>
  );
};
