import { RecruitStatus } from '@/shared/model/type';

export interface ClubDetailType {
  id: number;
  name: string;
  category: string;
  affiliation: string;
  description?: string;
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

export interface RecruitmentDetail {
  id: number;
  title: string;
  content: string;
  clubId: number;
  recruitStart: string; // ISO 날짜 문자열
  recruitEnd: string; // ISO 날짜 문자열
  status: RecruitStatus;
  createdAt: string; // ISO 날짜 문자열
  imageUrls: string[];
  recruitForm: string;
  isFavorite: boolean;
  instagramUrl: string;
  category: string;
  clubName: string;
  logo: string;
}

export interface RecruitmentDetailResponse {
  data: RecruitmentDetail;
}

export interface ClubRecruitments {
  id: number;
  title: string;
  content: string;
  recruitStart: string;
  recruitEnd: string;
  status: RecruitStatus;
  createdAt: string;
  firstImage?: string;
  isAlwaysRecruiting: boolean;
}

export interface ClubRecruitmentsResponse {
  recruitments: ClubRecruitments[];
}
