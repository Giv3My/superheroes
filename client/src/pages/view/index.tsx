import React from 'react';
import { useNavigate, useParams } from 'react-router';

import { useSuperhero } from '../../common/hooks';
import { getFullImageSrc, transformSuperpowers } from '../../common/utils';
import { PATHS } from '../../common/constants';
import { Icon } from '../../components/ui';

export const View: React.FC = ({}) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { superhero, isError } = useSuperhero(id!);

  React.useEffect(() => {
    if (isError) {
      goBackHome();
    }
  }, [isError]);

  const goBackHome = () => {
    navigate(PATHS.home());
  };

  return (
    superhero && (
      <div className="bg-gray-900 text-gray-100 min-h-screen px-4 py-8 max-w-5xl mx-auto">
        <button
          type="button"
          className="mb-6 flex items-center gap-2"
          onClick={goBackHome}
        >
          <Icon name="LuArrowLeft" className="p-2 w-10 h-10 border rounded-full" />
          <p>HOME</p>
        </button>
        <h1 className="text-3xl font-bold mb-4">{superhero?.nickname}</h1>
        <h2 className="text-xl text-gray-400 mb-6">
          Real Name: {superhero?.realName || '-'}
        </h2>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Origin Description</h3>
          <p className="text-gray-600 whitespace-pre-line">
            {superhero?.originDescription || 'No description yet'}
          </p>
        </div>
        {
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Superpowers</h3>
            <p className="text-gray-600 whitespace-pre-line">
              {!!superhero?.superpowers.length
                ? transformSuperpowers(superhero.superpowers)
                : 'No superpowers listed yet'}
            </p>
          </div>
        }
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Catch Phrase</h3>
          <p className="text-blue-400 italic">“{superhero?.catchPhrase || '---'}”</p>
        </div>
        {!!superhero?.images.length && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Images</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 xl">
              {superhero.images.map((img, index) => (
                <img
                  key={index}
                  src={getFullImageSrc(img)}
                  alt={`${superhero.nickname} ${index + 1}`}
                  className="w-full h-[400px] object-cover object-center rounded-lg border border-gray-700 shadow-lg"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  );
};
