import Link from 'next/link';
import ClubDescriptionTab from './club-description-tab';
import ClubDetailCommentsTab from './club-detail-comments-tab';
import RecruitDetailTab from './recruit-detail-tab';

interface RecruitDetailViewProps {
  title: string;
  content: string;
  recruitForm: string;
  imageUrls: string[];
  clubId: number;
}

interface ClubDetailTabsProps {
  activeTab: string;
  recruitData?: RecruitDetailViewProps;
  id: number;
}

const TABS = [
  { key: 'recruit', label: '모집공고' },
  { key: 'about', label: '동아리 소개' },
  { key: 'comments', label: '댓글' },
];

function ClubDetailTabs({ activeTab, recruitData, id }: ClubDetailTabsProps) {
  const getHref = (key: string) => {
    if (key === 'recruit') return `/recruit/${id}`;
    if (key === 'about') return `/recruit/${id}?tab=about`;
    if (key === 'comments') return `/recruit/${id}?tab=comments`;
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

      {activeTab === 'recruit' && (
        <RecruitDetailTab
          title={recruitData?.title ?? ''}
          content={recruitData?.content ?? ''}
          recruitForm={recruitData?.recruitForm ?? ''}
          imageUrls={recruitData?.imageUrls ?? []}
        />
      )}
      {activeTab === 'about' && (
        <ClubDescriptionTab clubId={recruitData!.clubId} />
      )}
      {activeTab === 'comments' && (
        <ClubDetailCommentsTab clubId={recruitData!.clubId} />
      )}
    </div>
  );
}

export default ClubDetailTabs;
