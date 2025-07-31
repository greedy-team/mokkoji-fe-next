'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { ArrowRight } from 'lucide-react';

export default function NavigateClubList() {
  const router = useRouter();

  const navigateClubPage = () => {
    router.push('/recruit');
  };

  return (
    <Button asChild={false} variant="link" size="lg" onClick={navigateClubPage}>
      동아리 찾아보기
      <ArrowRight />
    </Button>
  );
}
