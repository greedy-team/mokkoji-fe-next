'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ClubCategory, ClubCategoryLabel } from '@/shared/model/type';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './select';

function CategorySelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get('category')?.toUpperCase() ?? '';

  const categories: ClubCategory[] = [
    ClubCategory.ALL,
    ClubCategory.CULTURAL_ART,
    ClubCategory.ACADEMIC_CULTURAL,
    ClubCategory.VOLUNTEER_SOCIAL,
    ClubCategory.SPORTS,
    ClubCategory.RELIGIOUS,
    ClubCategory.SOCIAL,
    ClubCategory.ETC,
  ];

  const handleChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (value) {
      newParams.set('category', value);
    } else {
      newParams.delete('category');
    }
    if (value === ClubCategory.ALL) {
      newParams.delete('category');
    }

    router.push(`?${newParams.toString().toLocaleLowerCase()}`);
  };

  return (
    <Select value={active} onValueChange={handleChange}>
      <SelectTrigger>
        <SelectValue placeholder="전체" />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          <SelectLabel>카테고리</SelectLabel>
          {categories.map((c) => (
            <SelectItem key={c} value={c}>
              {ClubCategoryLabel[c]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default CategorySelect;
