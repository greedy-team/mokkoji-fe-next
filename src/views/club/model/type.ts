import { RecruitStatus } from '@/shared/model/type';

export interface ClubDetailType {
  id: number;
  name: string;
  category: string;
  affiliation: string;
  description: string;
  recruitStartDate: string;
  recruitEndDate: string;
  logo: string;
  isFavorite: boolean;
  instagram: string;
  recruitPost: string;
  status: RecruitStatus;
}

export interface ClubDetailData {
  data: ClubDetailType;
}
