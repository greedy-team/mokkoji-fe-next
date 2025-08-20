export interface RecruitItemListProps {
  searchParams: Promise<{
    page?: string;
    size?: string;
    keyword?: string;
    category?: string;
    affiliation?: string;
    recruitStatus?: string;
  }>;
}
export interface Club {
  id: number;
  name: string;
  description: string;
  clubCategory: string; // 필요하면 'VOLUNTEER_SOCIAL' | 'CULTURAL_ART' 등으로 좁혀도 됨
  clubAffiliation: string; // 필요하면 'CENTRAL_CLUB' 등으로 좁힘
  logo?: string; // 일부 데이터(lgoo)에서 오타가 있으니 선택적으로
  lgoo?: string; // 데이터에서 오타 키를 반영
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
