'use client';

import Image from 'next/image';
import Link from 'next/link';
import recruitUpIcon from '@/shared/assets/images/recruit/up.svg';
import useScrollUp from '../model/useScrollUp';

export default function ScrollTopButton() {
  const { isVisible } = useScrollUp();

  return isVisible ? (
    <Link
      href="#top"
      className="fixed right-6 bottom-25 z-50 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-white shadow-lg lg:bottom-10"
    >
      <Image src={recruitUpIcon} alt="Scroll to top" width={20} height={20} />
    </Link>
  ) : null;
}
