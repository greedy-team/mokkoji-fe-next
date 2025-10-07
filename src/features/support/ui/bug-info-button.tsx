'use client';

import Image from 'next/image';
import Link from 'next/link';

function BugInfoButton() {
  return (
    <Link
      href="#bottom"
      className="fixed right-6 bottom-10 z-50 flex h-[120px] w-[120px] cursor-pointer flex-col items-center justify-center gap-1 rounded-full bg-[#00E457] text-white"
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
