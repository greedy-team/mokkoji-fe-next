import { ClubCategory } from '@/shared/model/type';

export interface Club {
  id: number;
  name: string;
  description: string;
  clubCategory: ClubCategory;
  clubAffiliation: string;
  logo?: string;
}

export type RecruitmentStatus = 'BEFORE' | 'CLOSED' | 'OPEN'; // OPEN은 예시

export interface Recruitment {
  club: Club;
  id: number;
  title: string;
  recruitStart: string;
  recruitEnd: string;
  status: RecruitmentStatus;
  isFavorite: boolean;
}

export interface Pagination {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
}

export interface RecruitmentResponse {
  recruitments: Recruitment[];
  page: Pagination;
}
