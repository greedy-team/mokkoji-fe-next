export interface ClubDetailType {
  id: number;
  name: string;
  category: string;
  affiliation: string;
  description: string;
  recruitStartDate: string;
  recruitEndDate: string;
  logo: string;
  isFavorite: boolean;
  instagramLink: string;
  recruitPost: string;
}

export interface ClubDetailData {
  data: ClubDetailType;
}
