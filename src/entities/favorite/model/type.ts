export interface FavoriteDateItem {
  clubId: number;
  clubName: string;
  recruitStart: string;
  recruitEnd: string;
}

export interface FavoriteDateList {
  data: FavoriteDateItem[];
}

export interface FavoriteDeadLineItem {
  clubName: string;
  clubId: number;
}
