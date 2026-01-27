'use client';

import React from 'react';
import { ClubAffiliation, ClubAffiliationLabel } from '@/shared/model/type';
import useUrlParams from '../model/useUrlParams';

function AffiliationNavSelect() {
  const { handleChange, active } = useUrlParams('affiliation');

  const affiliations = [
    ClubAffiliation.CENTRAL_CLUB,
    ClubAffiliation.DEPARTMENT_CLUB,
    ClubAffiliation.SMALL_GROUP,
  ];

  return (
    <div className="mb-5 flex gap-3 text-xs sm:mb-12 sm:gap-4 sm:text-base">
      <button
        onClick={() => handleChange('ALL')}
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
            onClick={() => handleChange(affiliation)}
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
