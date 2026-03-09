import { RecruitStatus } from '@/shared/model/type';

export interface ClubDetail {
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

export interface ClubDetailRaw extends Omit<ClubDetail, 'isFavorite'> {
  favorite: boolean;
}

export interface ClubDetailData {
  data: ClubDetail;
}

export interface RecruitmentDetail {
  id: number;
  title: string;
  content: string;
  clubId: number;
  recruitStart: string;
  recruitEnd: string;
  status: RecruitStatus;
  createdAt: string;
  imageUrls: string[];
  recruitForm: string;
  isFavorite: boolean;
  instagramUrl: string;
  category: string;
  clubName: string;
  logo: string;
  isAlwaysRecruiting: boolean;
}

export interface RecruitmentDetailRaw
  extends Omit<RecruitmentDetail, 'isFavorite'> {
  favorite: boolean;
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

export interface ClubComment {
  id: number;
  content: string;
  rate: number;
  isModified: boolean;
  time: string;
  isWriter: boolean;
}

export function mapRecruitmentDetail({
  favorite,
  ...rest
}: RecruitmentDetailRaw): RecruitmentDetail {
  return { ...rest, isFavorite: favorite };
}

export function mapClubDetail({
  favorite,
  ...rest
}: ClubDetailRaw): ClubDetail {
  return { ...rest, isFavorite: favorite };
}
