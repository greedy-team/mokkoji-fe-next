export interface ApiResponse<T> {
  ok: boolean;
  message: string | undefined;
  data: T | undefined;
  error: string | undefined;
  status: number;
}

export enum ClubCategory {
  CULTURAL_ART = 'CULTURAL_ART',
  ACADEMIC_CULTURAL = 'ACADEMIC_CULTURAL',
  VOLUNTEER_SOCIAL = 'VOLUNTEER_SOCIAL',
  SPORTS = 'SPORTS',
  RELIGIOUS = 'RELIGIOUS',
  OTHER = 'OTHER',
}

export enum ClubAffiliation {
  CENTRAL_CLUB = 'CENTRAL_CLUB',
  DEPARTMENT_CLUB = 'DEPARTMENT_CLUB',
  SMALL_GROUP = 'SMALL_GROUP',
}

export interface ClubList {
  clubs: ClubType[];
}

export interface ClubType {
  id: number;
  name: string;
  category: ClubCategory;
  affiliation: ClubAffiliation;
  description?: string;
  recruitStartDate: string;
  recruitEndDate: string;
  logo: string;
  isFavorite: boolean | undefined;
}

export interface Pagination {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
}

export interface FavoriteList {
  clubs: ClubType[];
  pagination: Pagination;
}

export interface ClubSearchResponse {
  clubs: ClubType[];
  pagination: Pagination;
}

export const ClubCategoryLabel: Record<ClubCategory, string> = {
  [ClubCategory.CULTURAL_ART]: '문화/예술🎨',
  [ClubCategory.ACADEMIC_CULTURAL]: '학술/교양📚',
  [ClubCategory.VOLUNTEER_SOCIAL]: '봉사/사회🫶',
  [ClubCategory.SPORTS]: '체육🎾',
  [ClubCategory.RELIGIOUS]: '종교🙏',
  [ClubCategory.OTHER]: '기타',
};

export const ClubCategoryToLabel: Record<string, ClubCategory> = {
  CULTURAL_ART: ClubCategory.CULTURAL_ART,
  ACADEMIC_CULTURAL: ClubCategory.ACADEMIC_CULTURAL,
  VOLUNTEER_SOCIAL: ClubCategory.VOLUNTEER_SOCIAL,
  SPORTS: ClubCategory.SPORTS,
  RELIGIOUS: ClubCategory.RELIGIOUS,
  OTHER: ClubCategory.OTHER,
};

export const ClubAffiliationLabel: Record<ClubAffiliation, string> = {
  [ClubAffiliation.CENTRAL_CLUB]: '중앙',
  [ClubAffiliation.DEPARTMENT_CLUB]: '정인준/가인준',
  [ClubAffiliation.SMALL_GROUP]: '소모임',
};

export enum UserRole {
  GREEDY_ADMIN = 'GREEDY_ADMIN',
  CLUB_ADMIN = 'CLUB_ADMIN',
  CLUB_MASTER = 'CLUB_MASTER',
  NORMAL = 'NORMAL',
}

export const UserRoleLabel: Record<UserRole, string> = {
  [UserRole.GREEDY_ADMIN]: '그리디 관리자',
  [UserRole.CLUB_ADMIN]: '동아리 관리자',
  [UserRole.CLUB_MASTER]: '동아리장',
  [UserRole.NORMAL]: '일반 사용자',
};

export interface DetailParams {
  params: Promise<{ id: string }>;
}

export interface RecruitmentActionParams {
  params: Promise<{
    action: 'create' | 'edit';
    id: string;
  }>;
}

export interface ManageClub {
  clubId: number;
  clubName: string;
}

export interface GetClubManageInfoResponse {
  clubs: ManageClub[];
}

export interface ClubInfoType {
  id: number;
  name: string;
  category: string;
  affiliation: string;
  description: string;
  logo: string;
  instagram: string;
  recruitStartDate: string;
  recruitEndDate: string;
  isFavorite: boolean;
  recruitPost: string;
}

export interface ClubInfoResponse {
  data: ClubInfoType;
}

export type RecruitStatus =
  | 'OPEN'
  | 'CLOSED'
  | 'BEFORE'
  | 'IMMINENT'
  | 'ALWAYS';

export const RecruitStatusLabel: Record<RecruitStatus, string> = {
  OPEN: '모집 중',
  CLOSED: '모집 마감',
  BEFORE: '모집 전',
  IMMINENT: '마감 임박',
  ALWAYS: '상시 모집',
};
