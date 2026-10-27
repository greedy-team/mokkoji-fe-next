'use client';

import { parseAsInteger, useQueryState } from 'nuqs';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getFavoriteListOptions } from '../api/queries';
import FavoriteItemList from './favorite-item-list';

function FavoriteItemSection() {
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));
  const [size] = useQueryState('size', parseAsInteger.withDefault(6));

  const { data } = useSuspenseQuery(getFavoriteListOptions({ page, size }));

  return (
    <FavoriteItemList
      clubs={data.clubs}
      totalElements={data.pagination.totalElements}
      page={page}
      size={size}
    />
  );
}

export default FavoriteItemSection;
