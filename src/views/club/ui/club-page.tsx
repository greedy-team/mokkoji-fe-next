import ClubHeader from '@/entities/club/ui/club-header';
import ClubItemList from '@/widgets/club/ui/club-item-list';
import { RecruitItemListProps } from '@/widgets/recruit/model/type';
import ScrollToTopButton from '@/features/recruit/ui/scroll-to-top-button';

function ClubPage({ searchParams }: RecruitItemListProps) {
  return (
    <>
      <ClubHeader />
      <ClubItemList searchParams={searchParams} />
      <ScrollToTopButton />
    </>
  );
}

export default ClubPage;
