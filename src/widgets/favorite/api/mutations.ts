import type { MutationOptions } from '@tanstack/react-query';
import postClientFavorite from './postClientFavorite';
import deleteClientFavorite from './deleteClientFavorite';

export const postFavoriteMutationOptions = () =>
  ({
    mutationFn: (clubId: number) => postClientFavorite(clubId),
  }) satisfies MutationOptions<void, Error, number>;

export const deleteFavoriteMutationOptions = () =>
  ({
    mutationFn: (clubId: number) => deleteClientFavorite(clubId),
  }) satisfies MutationOptions<void, Error, number>;
