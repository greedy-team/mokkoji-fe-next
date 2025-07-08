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
    <Button
      asChild={false}
      variant="none"
      size="lg"
      className="flex cursor-pointer items-center gap-1.5 rounded-full bg-gradient-to-r from-[#00E804] to-[#33E3D0] text-base font-semibold text-white shadow-[0_0_8px_rgba(0,0,0,0.2)] transition hover:brightness-105"
      onClick={navigateClubPage}
    >
      동아리 찾아보기
      <ArrowRight />
    </Button>
  );
}
