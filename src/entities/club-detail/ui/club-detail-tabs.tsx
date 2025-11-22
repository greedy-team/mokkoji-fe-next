import Link from 'next/link';
import ClubRecruitWidget from '@/widgets/club-detail/ui/club-recruit-widget';
import ClubDescriptionWidget from '../../../widgets/club-detail/ui/club-description-tab';
import ClubCommentsWidget from '../../../widgets/club-detail/ui/club-comments-tab';

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
  recruitData?: RecruitDetailViewProps;
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
  id,
}: ClubDetailTabsProps) {
  const getHref = (key: string) => {
    if (key === 'recruit') return `/club/${id}`;
    if (key === 'about') return `/club/${id}?tab=about`;
    if (key === 'comments') return `/club/${id}?tab=comments`;
    return `/club/${id}`;
  };

  return (
    <div className="mt-12">
      <div className="flex justify-center gap-20 border-b border-b-[#D6D6D6] pb-3">
        {TABS.map((tab) => (
          <Link
            key={tab.key}
            href={getHref(tab.key)}
            prefetch={false}
            data-selected={tab.key === activeTab ? 'true' : 'false'}
            className="data-[selected=true]:text-primary-500 relative flex-1 text-center text-sm font-medium text-[#9C9C9C] lg:text-lg"
          >
            {tab.label}
            <span
              data-selected={tab.key === activeTab ? 'true' : 'false'}
              className="data-[selected=true]:bg-primary-500 absolute bottom-[-13px] left-0 h-[2px] w-full"
            />
          </Link>
        ))}
      </div>
      <div className="mx-auto w-full max-w-[1000px]">
        {(() => {
          switch (activeTab) {
            case 'recruit':
              return (
                <ClubRecruitWidget
                  isManageClub={isManageClub}
                  title={recruitData?.title ?? ''}
                  clubName={recruitData?.clubName ?? ''}
                  category={recruitData?.category ?? ''}
                  content={recruitData?.content ?? ''}
                  recruitForm={recruitData?.recruitForm ?? ''}
                  imageUrls={recruitData?.imageUrls ?? []}
                  recruitStart={recruitData?.recruitStart ?? ''}
                  recruitEnd={recruitData?.recruitEnd ?? ''}
                  clubId={Number(id)}
                />
              );

            case 'about':
              return <ClubDescriptionWidget clubId={id} />;

            case 'comments':
              return <ClubCommentsWidget clubId={id} />;

            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
}

export default ClubDetailTabs;
