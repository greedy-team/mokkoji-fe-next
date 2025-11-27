'use client';

import { ClubCategory, ClubCategoryLabel } from '@/shared/model/type';
import { Button } from '@/shared/ui/button';
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
  const { handleChange } = useUrlParams('category');

  return (
    <div>
      {categories.map((category) => (
        <Button
          key={category}
          variant="outline"
          className="mr-2"
          onClick={() => handleChange(category)}
        >
          {ClubCategoryLabel[category]}
        </Button>
      ))}
    </div>
  );
}

export default ClubCategoryButtonSection;
