'use client';

import Image from 'next/image';
import Link from 'next/link';

function BugInfoButton() {
  return (
    <Link
      href="#bottom"
      className="bg-primary-500 fixed right-6 bottom-10 z-50 flex h-[80px] w-[80px] cursor-pointer flex-col items-center justify-center gap-1 rounded-full text-xs text-white lg:h-[120px] lg:w-[120px] lg:text-base"
    >
      <span className="text-center">
        <span className="font-bold">버그</span> <br /> 제보하기
      </span>

      <Image
        src="/support/down.svg"
        alt="Scroll to bottom"
        width={14}
        height={14}
      />
    </Link>
  );
}

export default BugInfoButton;
