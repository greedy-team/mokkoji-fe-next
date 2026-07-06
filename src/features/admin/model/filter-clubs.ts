import type { ClubType } from '@/shared/model/type';

function filterClubsByName(clubs: ClubType[], query: string): ClubType[] {
  if (!query) return clubs;
  return clubs.filter((club) => club.name.includes(query));
}

export default filterClubsByName;
