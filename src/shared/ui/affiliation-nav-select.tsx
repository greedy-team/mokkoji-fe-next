'use client';

import React from 'react';
import { ClubAffiliation, ClubAffiliationLabel } from '@/shared/model/type';
import { useRouter, useSearchParams } from 'next/navigation';

function AffiliationNavSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get('affiliation') ?? '';

  const affiliations = [
    ClubAffiliation.CENTRAL_CLUB,
    ClubAffiliation.DEPARTMENT_CLUB,
    ClubAffiliation.SMALL_GROUP,
  ];

  const changeAffiliation = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === '') {
      params.delete('affiliation');
    } else {
      params.set('affiliation', value);
    }

    params.set('page', '1');

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mb-5 flex gap-3 text-xs sm:mb-12 sm:gap-4 sm:text-base">
      <button
        onClick={() => changeAffiliation('')}
        data-selected={active === ''}
        className="cursor-pointer data-[selected=false]:text-[#9F9F9F] data-[selected=true]:text-black"
      >
        전체
      </button>

      {affiliations.map((affiliation) => {
        const isActive = active === affiliation;

        return (
          <button
            key={affiliation}
            onClick={() => changeAffiliation(affiliation)}
            data-selected={isActive}
            className="cursor-pointer data-[selected=false]:text-[#9F9F9F] data-[selected=true]:text-black"
          >
            {ClubAffiliationLabel[affiliation]}
          </button>
        );
      })}
    </div>
  );
}

export default AffiliationNavSelect;
