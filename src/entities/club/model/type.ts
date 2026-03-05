import { RecruitStatus, Pagination } from '@/shared/model/type';

export type RecruitmentStatus = 'BEFORE' | 'CLOSED' | 'OPEN';

export interface RecruitmentPreviewResponse {
  id: number;
  recruitStart: string;
  recruitEnd: string;
  recruitStatus: RecruitStatus;
  isAlwaysRecruiting: boolean;
}

export interface Club {
  id: number;
  name: string;
  description: string;
  logo?: string;
  favorite: boolean;
  recruitmentPreviewResponse: RecruitmentPreviewResponse | null;
}

export interface Recruitment {
  club: Club;
  id: number;
  title: string;
  recruitStart: string;
  recruitEnd: string;
  status: RecruitmentStatus;
  isFavorite: boolean;
  isAlwaysRecruiting: boolean;
}

export interface RecruitmentResponse {
  recruitments: Recruitment[];
  page: Pagination;
}

export interface ClubsResponse {
  clubs: Club[];
  page: Pagination;
}

export const RecruitStatusLabel: Record<RecruitStatus, string> = {
  OPEN: '모집중',
  CLOSED: '모집마감',
  BEFORE: '모집전',
  IMMINENT: '마감임박',
  ALWAYS: '상시모집',
};
