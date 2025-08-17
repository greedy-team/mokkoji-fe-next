export interface SearchParams {
  page?: string;
  size?: string;
}

export interface FavoriteDateItem {
  clubId: number;
  clubName: string;
  recruitStart: string;
  recruitEnd: string;
}

export interface FavoriteDateList {
  data: FavoriteDateItem[];
}
