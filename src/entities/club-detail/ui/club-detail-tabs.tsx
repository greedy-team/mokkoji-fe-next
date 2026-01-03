import Link from 'next/link';
import ClubRecruitWidget from '@/widgets/club-detail/ui/club-recruit-widget';
import ClubDescriptionWidget from '@/widgets/club-detail/ui/club-description-widget';
import ClubCommentsWidget from '@/widgets/club-detail/ui/club-comments-widget';
import { ClubRecruitments } from '@/views/club/model/type';

interface RecruitDetailViewProps {
  title: string;
  clubName: string;
  category: string;
  content: string;
  recruitForm: string;
  imageUrls: string[];
  recruitStart?: string;
  recruitEnd?: string;
  clubId: number;
}

interface ClubDetailTabsProps {
  activeTab: string;
  isManageClub: boolean;
  recruitData: RecruitDetailViewProps;
  recruitHistories: ClubRecruitments[];
  id: number;
}

const TABS = [
  { key: 'recruit', label: '모집공고' },
  { key: 'about', label: '동아리 소개' },
  { key: 'comments', label: '댓글' },
];

function ClubDetailTabs({
  activeTab,
  isManageClub,
  recruitData,
  recruitHistories,
  id,
}: ClubDetailTabsProps) {
  const getHref = (key: string) => {
    switch (key) {
      case 'about':
        return `/club/${id}?tab=about`;
      case 'comments':
        return `/club/${id}?tab=comments`;
      case 'recruit':
      default:
        return `/club/${id}`;
    }
  };

  const renderContent = () => {
    if (activeTab === 'recruit') {
      if (!recruitData) return null;

      return (
        <ClubRecruitWidget
          isManageClub={isManageClub}
          title={recruitData.title}
          clubName={recruitData.clubName}
          category={recruitData.category}
          content={recruitData.content}
          recruitForm={recruitData.recruitForm}
          imageUrls={recruitData.imageUrls}
          recruitStart={recruitData.recruitStart || ''}
          recruitEnd={recruitData.recruitEnd || ''}
          clubId={Number(id)}
          recruitHistories={recruitHistories}
        />
      );
    }

    if (activeTab === 'about') {
      return <ClubDescriptionWidget clubId={id} />;
    }

    if (activeTab === 'comments') {
      return <ClubCommentsWidget clubId={id} />;
    }

    return null;
  };

  return (
    <div className="mt-12">
      <div className="flex justify-center border-b border-b-[#D6D6D6] pb-3">
        {TABS.map((tab) => {
          const isSelected = tab.key === activeTab;

          return (
            <Link
              key={tab.key}
              href={getHref(tab.key)}
              prefetch={false}
              className="data-[selected=true]:text-primary-500 relative flex-1 text-center text-sm font-medium text-[#9C9C9C] lg:text-lg"
              data-selected={isSelected}
            >
              <span className="whitespace-nowrap">{tab.label}</span>
              <span
                data-selected={isSelected}
                className="data-[selected=true]:bg-primary-500 absolute bottom-[-13px] left-0 h-[2px] w-full"
              />
            </Link>
          );
        })}
      </div>
      <div className="mx-auto min-h-[600px] w-full">{renderContent()}</div>
    </div>
  );
}

export default ClubDetailTabs;
