'use client';

import Image from 'next/image';
import Link from 'next/link';
import useScrollUp from '../model/useScrollUp';

export default function ScrollTopButton() {
  const { visible } = useScrollUp();

  return visible ? (
    <Link
      href="#top"
      className="fixed right-6 bottom-10 z-50 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-white shadow-lg"
    >
      <Image src="/recruit/up.svg" alt="Scroll to top" width={20} height={20} />
    </Link>
  ) : null;
}
