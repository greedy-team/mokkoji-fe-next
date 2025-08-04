export interface SearchParams {
  searchParams: Promise<{ page?: string; size?: string }>;
}

export interface FavoriteDateList {
  data: {
    clubName: string;
    recruitStart: Date;
    recruitEnd: Date;
  };
}
