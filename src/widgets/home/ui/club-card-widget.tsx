import CardSlider from '@/features/home/ui/club-card';
import ClubTextCard from '@/entities/home/ui/club-text-card';
import RecruitTextCard from '@/entities/home/ui/recruit-text-card';
import RecruitVerticalCarousel from '@/features/home/ui/recruit-vertical-carousel';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import getClubRecruitList from '@/widgets/recruit/api/getClubRecruitList';

async function ClubCardWidget() {
  const data = await getClubRecruitList({
    page: 1,
    size: 10,
  });
  if (!data.ok || !data.data) {
    return <ErrorBoundaryUi />;
  }

  return (
    <div className="flex flex-col gap-40">
      <div
        id="scroll-target"
        className="mb-10 flex h-fit flex-col items-center pt-30 lg:mb-40 lg:h-[300px] lg:flex-row lg:pt-20"
      >
        <ClubTextCard />
        <CardSlider data={data.data.recruitments} />
      </div>
      <div className="mb-40 flex h-[550px] w-full flex-col-reverse items-center gap-6 pt-10 lg:mb-60 lg:h-[300px] lg:flex-row lg:gap-0 lg:pt-20">
        <RecruitVerticalCarousel data={data.data.recruitments} />
        <RecruitTextCard />
      </div>
    </div>
  );
}

export default ClubCardWidget;
