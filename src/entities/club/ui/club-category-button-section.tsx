'use client';

import {
  ClubCategory,
  ClubCategoryIcon,
  ClubCategoryLabel,
} from '@/shared/model/type';
import Image from 'next/image';
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

  const base =
    'shrink-0 gap-1 rounded border px-3 py-2 text-sm font-semibold transition-colors';

  const selected = 'border-[#22CF64] text-[#22CF64] hover:bg-[#EDFDF3]';
  const unselected =
    'border-[#D4D4D4] bg-white text-[#4E5968] hover:bg-[#EDFDF3]';

  return (
    <div className="scrollbar-hide flex gap-1 overflow-x-auto pb-1 sm:gap-2">
      <Button
        type="button"
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
