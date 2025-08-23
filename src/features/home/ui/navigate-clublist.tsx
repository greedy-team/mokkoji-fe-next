import { Button } from '@/shared/ui/button';
import Image from 'next/image';
import Link from 'next/link';

function NavigateClubList() {
  return (
    <Button
      asChild
      variant="none"
      size="navi"
      className="text-md flex cursor-pointer items-center gap-1.5 rounded-full bg-gradient-to-r from-[#00E804] to-[#33E3D0] font-semibold text-white shadow-[0_0_8px_rgba(0,0,0,0.2)] transition hover:brightness-105 lg:text-[20px]"
    >
      <Link href="/recruit" className="flex items-center gap-2.5">
        모집공고 찾아보기
        <Image
          src="/main/arrow.svg"
          alt="모집공고 찾아보기 버튼"
          width={18}
          height={14}
        />
      </Link>
    </Button>
  );
}

export default NavigateClubList;
