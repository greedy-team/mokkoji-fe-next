import { ClubAffiliation, ClubCategory } from '@/shared/model/type';

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

// export interface Club {
//   id: number;
//   name: string;
//   category: ClubCategory;
//   affiliation: ClubAffiliation;
//   description: string;
//   recruitStartDate: string;
//   recruitEndDate: string;
//   logo?: string;
//   isFavorite: boolean;
// }

export interface RecruitmentPreviewResponse {
  id: number;
  recruitStart: string;
  recruitEnd: string;
  recruitStatus: RecruitStatus;
}

export interface Club {
  id: number;
  name: string;
  description: string;
  logo?: string;
  favorite: boolean;
  recruitmentPreviewResponse: RecruitmentPreviewResponse | null;
}

export interface ClubsResponse {
  clubs: Club[];
  page: Pagination;
}

export type RecruitStatus =
  | 'BEFORE'
  | 'CLOSED'
  | 'OPEN'
  | 'ALWAYS'
  | 'IMMINENT';

export const RecruitStatusLabel: Record<RecruitStatus, string> = {
  OPEN: '모집중',
  CLOSED: '모집마감',
  BEFORE: '모집전',
  IMMINENT: '마감임박',
  ALWAYS: '상시모집',
};
