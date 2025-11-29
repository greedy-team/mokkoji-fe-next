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

  return (
    <div>
      <Button
        variant="outline"
        className={cn(
          'mr-2 mb-2',
          active === '' && 'bg-primary-500 text-white',
        )}
        onClick={() => handleChange('')}
        aria-pressed={active === ''}
      >
        전체
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant="outline"
          className={cn(
            'mr-2 mb-2',
            active === category && 'bg-primary-500 text-white',
          )}
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
