export interface SearchParams {
  page?: string;
  size?: string;
}

export interface FavoriteDateItem {
  clubName: string;
  recruitStart: string;
  recruitEnd: string;
}

export interface FavoriteDateList {
  data: FavoriteDateItem[];
}
