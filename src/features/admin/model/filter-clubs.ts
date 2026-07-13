import type { AdminClub } from '@/entities/admin/model/types';

function filterClubsByName(clubs: AdminClub[], query: string): AdminClub[] {
  if (!query) return clubs;
  return clubs.filter((club) => club.clubName.includes(query));
}

export default filterClubsByName;
