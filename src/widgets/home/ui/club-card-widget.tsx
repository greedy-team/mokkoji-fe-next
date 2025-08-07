import CardSilder from '@/features/home/ui/club-card';
import ClubTextCard from '@/entities/home/ui/club-text-card';
import RecruitTextCard from '@/entities/home/ui/recruit-text-card';
import RecruitVerticalCarousel from '@/features/home/ui/recruit-vertical-carousel';
import getRecruitList from '@/widgets/recruit/api/getRecruitList';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';

async function ClubCardWidget() {
  let data;
  try {
    data = await getRecruitList({ page: 1, size: 100 });
  } catch (err) {
    return <ErrorBoundaryUi />;
  }

  const shuffled = [...data].sort(() => Math.random() - 0.5);

  return (
    <div className="flex flex-col gap-20 sm:gap-32 lg:gap-40">
      <div
        id="scroll-target"
        className="flex h-auto flex-col items-center gap-8 pt-10 sm:pt-16 lg:h-[300px] lg:flex-row lg:gap-0 lg:pt-20"
      >
        <ClubTextCard />
        <CardSilder data={shuffled.slice(0, 10)} />
      </div>
      <div className="flex h-auto w-full flex-col items-center gap-8 pt-10 pb-20 sm:pt-16 sm:pb-40 lg:h-[300px] lg:flex-row lg:gap-0 lg:pt-20 lg:pb-60">
        <RecruitVerticalCarousel data={shuffled.slice(10, 20)} />
        <RecruitTextCard />
      </div>
    </div>
  );
}

export default ClubCardWidget;
