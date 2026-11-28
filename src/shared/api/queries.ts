import { queryOptions } from '@tanstack/react-query';
import getClientClubNameList from './getClientClubNameList';

function getClubNameListOptions(universityCode: string, enabled: boolean) {
  return queryOptions({
    queryKey: ['clubs', 'names', universityCode],
    queryFn: () => getClientClubNameList(universityCode),
    enabled,
  });
}

export default getClubNameListOptions;
