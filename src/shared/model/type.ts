export interface ApiResponse<T> {
  status: number;
  message: string | undefined;
  data: T;
  error: string | undefined;
}

export enum ClubCategory {
  CULTURAL_ART = 'CULTURAL_ART',
  ACADEMIC_CULTURAL = 'ACADEMIC_CULTURAL',
  VOLUNTEER_SOCIAL = 'VOLUNTEER_SOCIAL',
  SOCIAL = 'SOCIAL',
  SPORTS = 'SPORTS',
  RELIGIOUS = 'RELIGIOUS',
  ETC = 'ETC',
}

export enum ClubAffiliation {
  CENTRAL_CLUB = 'CENTRAL_CLUB',
  DEPARTMENT_CLUB = 'DEPARTMENT_CLUB',
}

export interface ClubList {
  clubs: ClubType[];
}

export interface ClubType {
  id: number;
  name: string;
  category: ClubCategory;
  affiliation: ClubAffiliation;
  description: string;
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

export const ClubCategoryLabel: Record<ClubCategory, string> = {
  [ClubCategory.CULTURAL_ART]: '문화/예술',
  [ClubCategory.ACADEMIC_CULTURAL]: '학술/교양',
  [ClubCategory.VOLUNTEER_SOCIAL]: '봉사/사회',
  [ClubCategory.SPORTS]: '체육',
  [ClubCategory.RELIGIOUS]: '종교',
  [ClubCategory.SOCIAL]: '친목',
  [ClubCategory.ETC]: '기타',
};

export const ClubAffiliationLabel: Record<ClubAffiliation, string> = {
  [ClubAffiliation.CENTRAL_CLUB]: '중앙 동아리',
  [ClubAffiliation.DEPARTMENT_CLUB]: '가인준 동아리',
};

export interface DetailParams {
  params: Promise<{ id: string }>;
}
