import CardSilder from '@/features/home/ui/club-card';
import ClubTextCard from '@/entities/home/ui/club-text-card';
import getRecruitList from '@/widgets/recruit/api/getRecruitList';

async function ClubCardWidget() {
  const data = await getRecruitList({
    page: 1,
    size: 100,
    keyword: '',
    category: undefined,
    affiliation: undefined,
    recruitStatus: undefined,
  });

  return (
    <div id="scroll-target" className="flex h-[300px] items-center pt-20">
      <ClubTextCard />
      <CardSilder data={data} />
    </div>
  );
}

export default ClubCardWidget;
