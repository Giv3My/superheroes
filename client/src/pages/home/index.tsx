import React from 'react';

import { useHomeSuperheroes } from '../../common/hooks';
import { getFullImageSrc } from '../../common/utils';

import { ManageHeader, ManageList } from '../../components';

const headerItems = ['Image', 'Nickname'];

export const Home: React.FC = () => {
  const [search, setSearch] = React.useState('');

  const { superheroes, isLoading, createAsync, removeAsync } = useHomeSuperheroes();

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);
  };

  const filteredListItems = superheroes
    ?.filter(
      (superhero) =>
        superhero.nickname.toLowerCase().includes(search.toLowerCase()) ||
        superhero.realName.toLowerCase().includes(search.toLowerCase())
    )
    .map((superhero) => ({
      id: superhero.id,
      items: [
        <img
          className="w-52 h-52 object-cover object-top"
          src={getFullImageSrc(superhero.images[0] ?? null)}
          alt="superhero-avatar"
        />,
        <p>{superhero.nickname}</p>,
      ],
    }));

  return (
    <div className="max-w-7xl mx-auto px-3">
      <ManageHeader
        searchTerm={search}
        handleSearch={handleSearch}
        onClick={createAsync}
      />
      <ManageList
        isLoading={isLoading}
        headerItems={headerItems}
        listItems={filteredListItems ?? []}
        handleRemove={removeAsync}
      />
    </div>
  );
};
