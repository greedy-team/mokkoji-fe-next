'use client';

import { ClubCategory, ClubCategoryLabel } from '@/shared/model/type';
import { Button } from '@/shared/ui/button';
import cn from '@/shared/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

const categories: ClubCategory[] = [
  ClubCategory.CULTURAL_ART,
  ClubCategory.ACADEMIC_CULTURAL,
  ClubCategory.VOLUNTEER_SOCIAL,
  ClubCategory.SPORTS,
  ClubCategory.RELIGIOUS,
  ClubCategory.OTHER,
];

function ClubCategoryButtonSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get('category') ?? '';

  const changeCategory = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === '') {
      params.delete('category');
    } else {
      params.set('category', value);
    }

    params.set('page', '1');

    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      <Button
        variant="outline"
        className={cn(
          'mr-2 mb-2',
          active === '' && 'bg-primary-500 text-white',
        )}
        onClick={() => changeCategory('')}
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
          onClick={() => changeCategory(category)}
          aria-pressed={active === category}
        >
          {ClubCategoryLabel[category]}
        </Button>
      ))}
    </div>
  );
}

export default ClubCategoryButtonSection;
