import React from 'react';
import { useNavigate } from 'react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { superheroService } from '../services/superhero.service';
import { PATHS } from '../constants';

export const useHomeSuperheroes = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: superheroes, isLoading } = useQuery({
    queryKey: ['get superheroes'],
    queryFn: () => superheroService.getAll(),
    select: ({ data }) => data,
  });

  const { mutateAsync: createAsync } = useMutation({
    mutationKey: ['create movie'],
    mutationFn: () => superheroService.create(),
    onSuccess({ data: id }) {
      queryClient.invalidateQueries({
        queryKey: ['get superheroes'],
      });
      toast.success('The superhero has been successfully created');
      navigate(PATHS.edit(id));
    },
    onError: () => {
      toast.error('When creating an error occurred');
    },
  });

  const { mutateAsync: removeAsync } = useMutation({
    mutationKey: ['remove superhero'],
    mutationFn: (id: string) => superheroService.remove(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get superheroes'],
      });
      toast.success('The superhero has been successfully deleted');
    },
    onError: () => {
      toast.error('When deleting an error occurred');
    },
  });

  return React.useMemo(
    () =>
      ({
        superheroes,
        isLoading,
        createAsync,
        removeAsync,
      } as const),
    [superheroes, isLoading]
  );
};
