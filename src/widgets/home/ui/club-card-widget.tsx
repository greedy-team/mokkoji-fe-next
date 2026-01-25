import CardSlider from '@/features/home/ui/card-slider';
import ClubTextCard from '@/entities/home/ui/club-text-card';
import RecruitTextCard from '@/entities/home/ui/recruit-text-card';
import RecruitVerticalCarousel from '@/features/home/ui/recruit-vertical-carousel';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import getClubList from '@/widgets/club/api/getClubList';

async function ClubCardWidget() {
  const res = await getClubList({
    page: 1,
    size: 10,
  });
  if (!res.ok || !res.data) {
    return <ErrorBoundaryUi />;
  }

  return (
    <div className="flex flex-col gap-40">
      <div
        id="scroll-target"
        className="mb-10 flex h-fit flex-col items-center pt-30 lg:mb-40 lg:h-[300px] lg:flex-row lg:pt-20"
      >
        <ClubTextCard />
        <CardSlider clubs={res.data.clubs} />
      </div>
      <div className="mb-40 flex h-[550px] w-full flex-col-reverse items-center gap-6 pt-10 lg:mb-60 lg:h-[300px] lg:flex-row lg:gap-0 lg:pt-20">
        <RecruitVerticalCarousel clubs={res.data.clubs} />
        <RecruitTextCard />
      </div>
    </div>
  );
}

export default ClubCardWidget;
