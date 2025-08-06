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
