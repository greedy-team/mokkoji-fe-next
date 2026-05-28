'use client';

import { useState } from 'react';

const TABS = [
  { key: 'club-create', label: '동아리 생성' },
  { key: 'club-leader-application', label: '동아리장 등록' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

function ClubApplicationTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>('club-create');

  return (
    <div>
      <div className="sticky top-0 z-30 mb-8 flex justify-start border-b border-b-[#D6D6D6] bg-white pb-3 lg:mb-12">
        {TABS.map((tab) => {
          const isSelected = tab.key === activeTab;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className="relative px-4 text-sm font-medium lg:text-base"
              data-selected={isSelected}
            >
              <span
                className={isSelected ? 'text-primary-500' : 'text-[#9C9C9C]'}
              >
                {tab.label}
              </span>
              <span
                className={`absolute bottom-[-13px] left-0 h-[2px] w-full transition-colors ${
                  isSelected ? 'bg-primary-500' : 'bg-transparent'
                }`}
              />
            </button>
          );
        })}
      </div>

      <div className="min-h-[600px] w-full">
        {activeTab === 'club-create' && <div>{/* 동아리 생성 폼 */}</div>}
        {activeTab === 'club-leader-application' && (
          <div>{/* 동아리장 신청 폼 */}</div>
        )}
      </div>
    </div>
  );
}

export default ClubApplicationTabs;
