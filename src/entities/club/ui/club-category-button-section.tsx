'use client';

import { ClubCategory, ClubCategoryLabel } from '@/shared/model/type';
import { Button } from '@/shared/ui/button';
import cn from '@/shared/lib/utils';
import useUrlParams from '@/shared/model/useUrlParams';

const categories: ClubCategory[] = [
  ClubCategory.CULTURAL_ART,
  ClubCategory.ACADEMIC_CULTURAL,
  ClubCategory.VOLUNTEER_SOCIAL,
  ClubCategory.SPORTS,
  ClubCategory.RELIGIOUS,
  ClubCategory.OTHER,
];

function ClubCategoryButtonSection() {
  const { handleChange, active } = useUrlParams('category');

  const base =
    'shrink-0 rounded border px-3 py-2 text-sm font-semibold transition-colors';

  const selected = 'border-[#22CF64] text-[#22CF64] hover:bg-[#EDFDF3]';
  const unselected =
    'border-[#D4D4D4] bg-white text-[#4E5968] hover:bg-[#EDFDF3]';

  return (
    <div className="scrollbar-hide flex gap-1 overflow-x-auto sm:gap-2">
      <Button
        type="button"
        variant="outline"
        className={cn(base, active === '' ? selected : unselected)}
        onClick={() => handleChange('')}
        aria-pressed={active === ''}
      >
        전체
      </Button>

      {categories.map((category) => (
        <Button
          key={category}
          type="button"
          variant="outline"
          className={cn(base, active === category ? selected : unselected)}
          onClick={() => handleChange(category)}
          aria-pressed={active === category}
        >
          {ClubCategoryLabel[category]}
        </Button>
      ))}
    </div>
  );
}

export default ClubCategoryButtonSection;
