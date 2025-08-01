import CardSilder from '@/features/home/ui/club-card';
import ClubTextCard from '@/entities/home/ui/club-text-card';
import getRecruitList from '@/widgets/recruit/api/getRecruitList';
import RecruitTextCard from '@/entities/home/ui/recruit-text-card';
import RecruitVerticalCarousel from '@/features/home/ui/recruit-vertical-carousel';

async function ClubCardWidget() {
  const data = await getRecruitList({
    page: 1,
    size: 100,
  });
  const shuffled = [...data].sort(() => Math.random() - 0.5);

  return (
    <div className="flex flex-col gap-40">
      <div id="scroll-target" className="flex h-[300px] items-center pt-20">
        <ClubTextCard />
        <CardSilder data={shuffled.slice(0, 10)} />
      </div>
      <div className="flex h-[300px] w-full items-center pt-20 pb-60">
        <RecruitVerticalCarousel data={shuffled.slice(10, 20)} />
        <RecruitTextCard />
      </div>
    </div>
  );
}

export default ClubCardWidget;
