'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface HeaderMobileProps {
  pageTitle: string;
}

function HeaderMobile({ pageTitle }: HeaderMobileProps) {
  const router = useRouter();

  return (
    <header className="flex items-center gap-2 px-5 py-5">
      <button onClick={() => router.back()} className="p-1">
        <Image
          src="/mobile-prev.svg"
          alt="뒤로가기 버튼"
          width={12}
          height={16}
        />
      </button>
      <h1 className="text-base font-semibold">{pageTitle}</h1>
    </header>
  );
}

export default HeaderMobile;
