'use client';

import React from 'react';
import { ClubAffiliation, ClubAffiliationLabel } from '@/shared/model/type';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './select';
import useUrlParams from '../model/useUrlParams';

function AffiliationNavSelect() {
  const { handleChange, active } = useUrlParams('affiliation');

  const affiliations = [
    ClubAffiliation.CENTRAL_CLUB,
    ClubAffiliation.DEPARTMENT_CLUB,
    ClubAffiliation.SMALL_GROUP,
  ];

  return (
    <Select value={active} onValueChange={handleChange}>
      <SelectTrigger
        aria-label="소속 선택"
        className="data-[placeholder]:text-foreground mb-0 cursor-pointer"
      >
        <SelectValue placeholder="전체" />
      </SelectTrigger>

      <SelectContent position="popper">
        <SelectGroup>
          <SelectLabel>소속</SelectLabel>
          <SelectItem value="ALL" className="cursor-pointer">
            전체
          </SelectItem>
          {affiliations.map((c) => (
            <SelectItem key={c} value={c} className="cursor-pointer">
              {ClubAffiliationLabel[c]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default AffiliationNavSelect;
