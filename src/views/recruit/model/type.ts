export type RecruitmentStatus = 'BEFORE' | 'OPEN' | 'CLOSED';
export interface RecruitmentDetail {
  id: number;
  title: string;
  content: string;
  recruitStart: string; // ISO 날짜 문자열
  recruitEnd: string; // ISO 날짜 문자열
  status: RecruitmentStatus;
  createdAt: string; // ISO 날짜 문자열
  imageUrls: string[];
  recruitForm: string;
}

export interface RecruitmentDetailResponse {
  data: RecruitmentDetail;
}
