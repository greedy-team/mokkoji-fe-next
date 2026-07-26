'use client';

import { useSearchParams } from 'next/navigation';
import { useSuspenseQuery } from '@tanstack/react-query';
import favoriteQueries from '../api/queries';
import FavoriteItemList from './favorite-item-list';

function FavoriteItemSection() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const size = Number(searchParams.get('size')) || 6;

  const { data } = useSuspenseQuery(favoriteQueries.list({ page, size }));

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
