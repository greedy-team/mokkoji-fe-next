'use client';

import Link from 'next/link';

function LoginRequired() {
  return (
    <div className="flex h-full min-h-[50vh] flex-col items-center justify-center gap-[10px]">
      <h1 className="text-sm font-bold lg:text-2xl">
        로그인이 필요한 서비스예요!
      </h1>
      <Link href="/login" className="font-semibold text-[#00E457] underline">
        로그인하기
      </Link>
    </div>
  );
}

export default LoginRequired;
