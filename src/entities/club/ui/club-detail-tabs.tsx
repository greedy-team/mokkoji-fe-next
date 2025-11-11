'use client';

import { useState } from 'react';

interface ClubDetailTabsProps {
  clubId: number;
}

const TABS = ['모집공고', '동아리 소개', '댓글'] as const;
type Tab = (typeof TABS)[number];

function ClubDetailTabs({ clubId }: ClubDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('모집공고');

  return (
    <div className="mt-12">
      <div className="flex justify-start gap-20 border-b border-b-[#D6D6D6] pb-3">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            data-selected={activeTab === tab ? 'true' : 'false'}
            className="data-[selected=true]:text-primary-500 relative flex-1 text-center text-lg font-medium text-[#9C9C9C]"
          >
            {tab}
            <span
              data-selected={activeTab === tab ? 'true' : 'false'}
              className="data-[selected=true]:bg-primary-500 absolute bottom-[-13px] left-0 h-[2px] w-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ClubDetailTabs;
