'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { ClubCategory } from '@/shared/model/type';
import { Session } from 'next-auth';
import getClubRecruitClientList from '../api/getClubRecruitClientList';

function useClubRecruitList({
  page,
  size,
  category,
  session,
}: {
  page: number;
  size: number;
  category?: ClubCategory;
  session: Session | null;
}) {
  return useSuspenseQuery({
    queryKey: ['recruitments', page, size, category],
    queryFn: () => getClubRecruitClientList({ page, size, category, session }),
    staleTime: 1000 * 60 * 30,
  });
}

export default useClubRecruitList;
