'use client';

import Link from 'next/link';

function BugInfoButton() {
  return (
    <Link
      href="https://docs.google.com/forms/d/e/1FAIpQLSdYOTZnswSrOIkqXGrqSurvQJgNyeBFVf_CjvyYGetgfq3o7g/viewform"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-6 bottom-28 z-50 flex h-[80px] w-[80px] cursor-pointer flex-col items-center justify-center gap-1 gap-2 rounded-full bg-gradient-to-br from-[#4AF38A] via-[#4AF38A] via-40% to-[#32E2D0] text-xs lg:bottom-10 lg:h-[120px] lg:w-[120px] lg:text-base"
    >
      <span className="text-center font-semibold text-black">
        <span className="font-extrabold">버그</span> <br /> 제보하기
      </span>
    </Link>
  );
}

export default BugInfoButton;
