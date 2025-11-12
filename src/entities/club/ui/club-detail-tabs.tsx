import Link from 'next/link';
import { CommentType } from '@/widgets/recruit-detail/model/type';
import RecruitDetailView from '@/entities/recruit-detail/ui/recruit-detail-view';
import ClubDescriptionTab from './tabs/club-description-tab';
import ClubDetailCommentsTab from './tabs/club-detail-comments-tab';

interface RecruitDetailViewProps {
  title: string;
  content: string;
  recruitForm: string;
  imageUrls: string[];
}

interface ClubDetailTabsProps {
  activeTab: string;
  recruitData?: RecruitDetailViewProps;
  description?: string;
  clubId: number;
  comments?: CommentType[];
}

const TABS = [
  { key: 'recruit', label: '모집공고' },
  { key: 'about', label: '동아리 소개' },
  { key: 'comments', label: '댓글' },
];

function ClubDetailTabs({
  activeTab,
  recruitData,
  description,
  clubId,
  comments,
}: ClubDetailTabsProps) {
  const getHref = (key: string) => {
    if (key === 'recruit') return `/club/${clubId}`;
    if (key === 'about') return `/club/${clubId}?tab=about`;
    if (key === 'comments') return `/club/${clubId}?tab=comments`;
    return `/club/${clubId}`;
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
        <RecruitDetailView
          title={recruitData?.title ?? ''}
          content={recruitData?.content ?? ''}
          recruitForm={recruitData?.recruitForm ?? ''}
          imageUrls={recruitData?.imageUrls ?? []}
        />
      )}
      {activeTab === 'about' && (
        <ClubDescriptionTab description={description} />
      )}
      {activeTab === 'comments' && (
        <ClubDetailCommentsTab clubId={clubId} comments={comments} />
      )}
    </div>
  );
}

export default ClubDetailTabs;
