'use client';

import { useState } from 'react';
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
  recruitData?: RecruitDetailViewProps;
  description?: string;
  clubId: number;
  comments?: CommentType[];
}

const TABS = ['모집공고', '동아리 소개', '댓글'] as const;
type Tab = (typeof TABS)[number];

function ClubDetailTabs({
  recruitData,
  description,
  clubId,
  comments,
}: ClubDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('모집공고');

  return (
    <div className="mt-12">
      <div className="flex justify-center gap-20 border-b border-b-[#D6D6D6] pb-3">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            data-selected={activeTab === tab ? 'true' : 'false'}
            className="data-[selected=true]:text-primary-500 relative flex-1 text-center text-sm font-medium text-[#9C9C9C] lg:text-lg"
          >
            {tab}
            <span
              data-selected={activeTab === tab ? 'true' : 'false'}
              className="data-[selected=true]:bg-primary-500 absolute bottom-[-13px] left-0 h-[2px] w-full"
            />
          </button>
        ))}
      </div>
      {activeTab === '모집공고' && (
        <RecruitDetailView
          title={recruitData?.title ?? ''}
          content={recruitData?.content ?? ''}
          recruitForm={recruitData?.recruitForm ?? ''}
          imageUrls={recruitData?.imageUrls ?? []}
        />
      )}
      {activeTab === '동아리 소개' && (
        <ClubDescriptionTab description={description} />
      )}
      {activeTab === '댓글' && (
        <ClubDetailCommentsTab clubId={clubId} comments={comments} />
      )}
    </div>
  );
}

export default ClubDetailTabs;
