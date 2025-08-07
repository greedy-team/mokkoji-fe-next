import CardSilder from '@/features/home/ui/club-card';
import ClubTextCard from '@/entities/home/ui/club-text-card';
import RecruitTextCard from '@/entities/home/ui/recruit-text-card';
import RecruitVerticalCarousel from '@/features/home/ui/recruit-vertical-carousel';

function ClubCardWidget() {
  const shuffled = [
    {
      id: 1,
      name: 'NODE',
      category: '개발',
      description:
        '소규모 그룹으로 자동화되고 빠르게 검증 가능한 소규모 프로젝트를 기획, 개발, 검증하는 그룹입니다.',
      logo: '/main/category.png',
      recruitStartDate: '2025-02-28',
      recruitEndDate: '2025-03-15',
    },
    {
      id: 2,
      name: 'STC',
      category: '개발',
      description: '소프트웨어 테스트를 전문으로 하는 동아리입니다.',
      logo: '/main/category.png',
      recruitStartDate: '2025-03-05',
      recruitEndDate: '2025-03-06',
    },
    {
      id: 3,
      name: 'SCC',
      category: '개발',
      description: '소프트웨어 개발을 전문으로 하는 동아리입니다.',
      logo: '/main/category.png',
      recruitStartDate: '2025-03-01',
      recruitEndDate: '2025-03-10',
    },
    {
      id: 4,
      name: 'SCC',
      category: '개발',
      description: '소프트웨어 개발을 전문으로 하는 동아리입니다.',
      logo: '/main/category.png',
      recruitStartDate: '2025-03-01',
      recruitEndDate: '2025-03-10',
    },
    {
      id: 5,
      name: 'SCC',
      category: '개발',
      description: '소프트웨어 개발을 전문으로 하는 동아리입니다.',
      logo: '/main/category.png',
      recruitStartDate: '2025-03-01',
      recruitEndDate: '2025-03-10',
    },
    {
      id: 6,
      name: 'SCC',
      category: '개발',
      description: '소프트웨어 개발을 전문으로 하는 동아리입니다.',
      logo: '/main/category.png',
      recruitStartDate: '2025-03-01',
      recruitEndDate: '2025-03-10',
    },
    {
      id: 7,
      name: 'SCC',
      category: '개발',
      description: '소프트웨어 개발을 전문으로 하는 동아리입니다.',
      logo: '/main/category.png',
      recruitStartDate: '2025-03-01',
      recruitEndDate: '2025-03-10',
    },
    {
      id: 8,
      name: 'SCC',
      category: '개발',
      description: '소프트웨어 개발을 전문으로 하는 동아리입니다.',
      logo: '/main/category.png',
      recruitStartDate: '2025-03-01',
      recruitEndDate: '2025-03-10',
    },
    {
      id: 9,
      name: 'SCC',
      category: '개발',
      description: '소프트웨어 개발을 전문으로 하는 동아리입니다.',
      logo: '/main/category.png',
      recruitStartDate: '2025-03-01',
      recruitEndDate: '2025-03-10',
    },
    {
      id: 10,
      name: 'SCC',
      category: '개발',
      description: '소프트웨어 개발을 전문으로 하는 동아리입니다.',
      logo: '/main/category.png',
      recruitStartDate: '2025-03-01',
      recruitEndDate: '2025-03-10',
    },
    {
      id: 11,
      name: 'SCC',
      category: '개발',
      description: '소프트웨어 개발을 전문으로 하는 동아리입니다.',
      logo: '/main/category.png',
      recruitStartDate: '2025-03-01',
      recruitEndDate: '2025-03-10',
    },
    {
      id: 12,
      name: 'SCC',
      category: '개발',
      description: '소프트웨어 개발을 전문으로 하는 동아리입니다.',
      logo: '/main/category.png',
      recruitStartDate: '2025-03-01',
      recruitEndDate: '2025-03-10',
    },
    {
      id: 13,
      name: 'SCC',
      category: '개발',
      description: '소프트웨어 개발을 전문으로 하는 동아리입니다.',
      logo: '/main/category.png',
      recruitStartDate: '2025-03-01',
      recruitEndDate: '2025-03-10',
    },
    {
      id: 14,
      name: 'SCC',
      category: '개발',
      description: '소프트웨어 개발을 전문으로 하는 동아리입니다.',
      logo: '/main/category.png',
      recruitStartDate: '2025-03-01',
      recruitEndDate: '2025-03-10',
    },
    {
      id: 15,
      name: 'SCC',
      category: '개발',
      description: '소프트웨어 개발을 전문으로 하는 동아리입니다.',
      logo: '/main/category.png',
      recruitStartDate: '2025-03-01',
      recruitEndDate: '2025-03-10',
    },
    {
      id: 16,
      name: 'SCC',
      category: '개발',
      description: '소프트웨어 개발을 전문으로 하는 동아리입니다.',
      logo: '/main/category.png',
      recruitStartDate: '2025-03-01',
      recruitEndDate: '2025-03-10',
    },
    {
      id: 17,
      name: 'SCC',
      category: '개발',
      description: '소프트웨어 개발을 전문으로 하는 동아리입니다.',
      logo: '/main/category.png',
      recruitStartDate: '2025-03-01',
      recruitEndDate: '2025-03-10',
    },
    {
      id: 18,
      name: 'SCC',
      category: '개발',
      description: '소프트웨어 개발을 전문으로 하는 동아리입니다.',
      logo: '/main/category.png',
      recruitStartDate: '2025-03-01',
      recruitEndDate: '2025-03-10',
    },
    {
      id: 19,
      name: 'SCC',
      category: '개발',
      description: '소프트웨어 개발을 전문으로 하는 동아리입니다.',
      logo: '/main/category.png',
      recruitStartDate: '2025-03-01',
      recruitEndDate: '2025-03-10',
    },
    {
      id: 20,
      name: 'SCC',
      category: '개발',
      description: '소프트웨어 개발을 전문으로 하는 동아리입니다.',
      logo: '/main/category.png',
      recruitStartDate: '2025-03-01',
      recruitEndDate: '2025-03-10',
    },
  ];

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
