'use client';

import Image from 'next/image';

function handleKakaoLogin() {
  const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const url = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  window.location.href = url;
}

export default function KakaoLoginPage() {
  return (
    <div className="flex h-full flex-col bg-white">
      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-8">
        <Image
          src="/header/mokkojiLogoPrimary.svg"
          alt="Mokkoji 로고"
          width={64}
          height={64}
          className="object-contain"
        />

        <div className="flex flex-col items-center gap-2.5 text-center">
          <p className="text-[22px] leading-snug font-bold tracking-tight break-keep text-neutral-900">
            우리 학교의 모든 동아리,
            <br />
            모꼬지에서 한눈에.
          </p>
          <p className="text-sm leading-relaxed tracking-tight break-keep text-neutral-400">
            캠퍼스 안의 다양한 동아리를 만나보세요.
          </p>
        </div>
      </main>

      <footer className="flex flex-col gap-3 px-5">
        <button
          type="button"
          onClick={handleKakaoLogin}
          className="relative flex w-full items-center justify-center rounded-2xl bg-[#FEE500] py-4 transition-all active:scale-[0.985] active:bg-[#F0D900]"
        >
          <svg
            className="absolute left-4 h-5 w-5 shrink-0"
            viewBox="0 0 22 22"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11 2C6.029 2 2 5.358 2 9.5c0 2.613 1.613 4.913 4.063 6.263L5.25 19.25l4.013-2.65c.572.083 1.158.125 1.737.125 4.971 0 9-3.358 9-7.5S15.971 2 11 2z"
              fill="#1A1A1A"
            />
          </svg>
          <span className="text-base font-semibold tracking-tight text-neutral-900">
            카카오톡으로 시작하기
          </span>
        </button>
      </footer>
    </div>
  );
}
