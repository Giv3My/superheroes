import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { superheroService } from '../services/superhero.service';

export const useSuperhero = (superheroId: string) => {
  const {
    data: superhero,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['superhero', superheroId],
    queryFn: () => superheroService.getById(superheroId),
    enabled: Boolean(superheroId),
    select: ({ data }) => data,
    retry: 0,
  });

  return React.useMemo(
    () =>
      ({
        superhero,
        isLoading,
        isError,
      } as const),
    [superhero, isLoading, isError]
  );
};
