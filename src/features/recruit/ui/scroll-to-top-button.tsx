'use client';

import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import useScrollUp from '../model/useScrollUp';

export default function ScrollToTopButton() {
  const { visible, scrollToTop } = useScrollUp();

  return visible ? (
    <Button
      onClick={scrollToTop}
      asChild
      className="fixed right-6 bottom-60 z-50 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-white shadow-lg"
    >
      <Image src="/recruit/up.svg" alt="Scroll to top" width={20} height={20} />
    </Button>
  ) : null;
}
