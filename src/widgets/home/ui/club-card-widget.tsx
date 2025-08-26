import CardSilder from '@/features/home/ui/club-card';
import ClubTextCard from '@/entities/home/ui/club-text-card';
import RecruitTextCard from '@/entities/home/ui/recruit-text-card';
import RecruitVerticalCarousel from '@/features/home/ui/recruit-vertical-carousel';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import getClubRecruitList from '@/widgets/recruit/api/getClubRecruitList';

async function ClubCardWidget() {
  const data = await getClubRecruitList({
    page: 1,
    size: 100,
  });
  if (!data.ok) {
    return <ErrorBoundaryUi />;
  }
  const shuffled = [...(data.data?.recruitments || [])].sort(
    () => Math.random() - 0.5,
  );

  return (
    <div className="flex flex-col gap-40">
      <div
        id="scroll-target"
        className="mb-10 flex h-fit flex-col items-center pt-30 lg:mb-40 lg:h-[300px] lg:flex-row lg:pt-20"
      >
        <ClubTextCard />
        <CardSilder data={shuffled.slice(0, 10)} />
      </div>
      <div className="mb-40 flex h-[550px] w-full flex-col-reverse items-center gap-6 pt-10 lg:mb-60 lg:h-[300px] lg:flex-row lg:gap-0 lg:pt-20">
        <RecruitVerticalCarousel data={shuffled.slice(10, 20)} />
        <RecruitTextCard />
      </div>
    </div>
  );
}

export default ClubCardWidget;
