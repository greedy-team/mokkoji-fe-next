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

function CategorySelect() {
  const { handleChange, searchParams } = useUrlParams('affiliation');
  const active = searchParams.get('affiliation')?.toUpperCase() ?? '';

  const affiliations = [
    ClubAffiliation.CENTRAL_CLUB,
    ClubAffiliation.DEPARTMENT_CLUB,
    ClubAffiliation.SMALL_GROUP,
  ];

  return (
    <Select value={active} onValueChange={handleChange}>
      <SelectTrigger aria-label="카테고리 선택" className="mb-0">
        <SelectValue placeholder="전체" />
      </SelectTrigger>

      <SelectContent position="popper">
        <SelectGroup>
          <SelectLabel>카테고리</SelectLabel>
          <SelectItem value="ALL">전체</SelectItem>
          {affiliations.map((c) => (
            <SelectItem key={c} value={c}>
              {ClubAffiliationLabel[c]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default CategorySelect;
