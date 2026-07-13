import type { ClubCategory, ClubAffiliation } from '@/shared/model/type';

export interface AdminClub {
  clubId: number;
  clubName: string;
  universityCode: string;
  universityName: string;
  category: ClubCategory;
  affiliation: ClubAffiliation;
  logo: string;
  masterId: number;
  masterName: string;
  masterEmail: string;
}
