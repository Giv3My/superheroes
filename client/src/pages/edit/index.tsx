import React from 'react';
import { useNavigate, useParams } from 'react-router';

import { PATHS } from '../../common/constants';

import { EditForm } from './edit-form';
import { useSuperheroEdit } from '../../common/hooks';

export const Edit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { superhero, updateSuperhero, isError } = useSuperheroEdit(id!);

  React.useEffect(() => {
    if (isError) {
      goBackHome();
    }
  }, [isError]);

  const goBackHome = () => {
    navigate(PATHS.home());
  };

  return (
    <div className="max-w-[1000px] w-[90%] px-6 mx-auto">
      {superhero && (
        <EditForm
          superhero={superhero}
          updateSuperhero={updateSuperhero}
          goBackHome={goBackHome}
        />
      )}
    </div>
  );
};
