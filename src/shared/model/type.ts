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
  SPORTS = 'SPORTS',
  RELIGIOUS = 'RELIGIOUS',
  SOCIAL = 'SOCIAL',
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
  imageURL: string;
  isFavorite: boolean | undefined;
}
