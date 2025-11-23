'use client';

import { ClubCategory, ClubCategoryLabel } from '@/shared/model/type';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';

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
  return categories.map((category) => (
    <Button
      key={category}
      variant="outline"
      className="mr-2"
      onClick={() => router.push(`/club?category=${category}`)}
    >
      {ClubCategoryLabel[category]}
    </Button>
  ));
}

export default ClubCategoryButtonSection;
