import ClubHeader from '@/entities/club/ui/club-header';
import ClubItemList from '@/widgets/club/ui/club-item-list';
import { RecruitItemListProps } from '@/widgets/recruit/model/type';
import ScrollTopButton from '@/features/recruit/ui/scroll-top-button';

function ClubPage({ searchParams }: RecruitItemListProps) {
  return (
    <>
      <ClubHeader />
      <ClubItemList searchParams={searchParams} />
      <ScrollTopButton />
    </>
  );
}

export default ClubPage;
