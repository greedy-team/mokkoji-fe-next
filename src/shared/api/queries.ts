import { queryOptions } from '@tanstack/react-query';
import getClientClubNameList from './getClientClubNameList';

// shared/ui의 즐겨찾기 버튼도 무효화해야 해서 widgets가 아닌 shared에 둔다
export const favoriteBaseKey = ['favorites'] as const;

export function getClubNameListOptions(
  universityCode: string,
  enabled: boolean,
) {
  return queryOptions({
    queryKey: ['clubs', 'names', universityCode],
    queryFn: () => getClientClubNameList(universityCode),
    enabled,
  });
}
