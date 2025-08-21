export type RecruitmentStatus = 'BEFORE' | 'OPEN' | 'CLOSED';
export interface RecruitmentDetail {
  id: number;
  title: string;
  content: string;
  clubId: number;
  recruitStart: string; // ISO 날짜 문자열
  recruitEnd: string; // ISO 날짜 문자열
  status: RecruitmentStatus;
  createdAt: string; // ISO 날짜 문자열
  imageUrls: string[];
  recruitForm: string;
  isFavorite: boolean;
  instagram: string;
  category: string;
  clubName: string;
  logo: string;
}

export interface RecruitmentDetailResponse {
  data: RecruitmentDetail;
}
