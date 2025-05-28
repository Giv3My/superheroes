import React from 'react';
import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useSuperhero } from './use-superhero';
import { superheroService } from '../services/superhero.service';
import { PATHS } from '../constants';
import type { SuperheroEditInput } from '../../types/superhero.types';

export const useSuperheroEdit = (superheroId: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { superhero, isLoading, isError } = useSuperhero(superheroId);

  const { mutateAsync: updateSuperhero, isPending } = useMutation({
    mutationKey: ['update superhero'],
    mutationFn: (values: SuperheroEditInput) => {
      return superheroService.update(superheroId, values);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get superheroes'],
      });
      navigate(PATHS.home());
      toast.success('The superhero is successfully updated');
    },
    onError() {
      toast.error('When updating an error occurred');
    },
  });

  return React.useMemo(
    () =>
      ({
        superhero,
        isLoading,
        isError,
        updateSuperhero,
        isPending,
      } as const),
    [superhero, isLoading, isError, updateSuperhero, isPending]
  );
};
