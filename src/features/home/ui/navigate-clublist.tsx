import { Button } from '@/shared/ui/button';
import Image from 'next/image';
import Link from 'next/link';

function NavigateClubList() {
  return (
    <Button
      asChild
      variant="none"
      size="navi"
      className="flex cursor-pointer items-center gap-1.5 rounded-full bg-[linear-gradient(160deg,#4Af38A_0%,#33E3D0_100%)] text-xs font-semibold text-black shadow-[0_0_8px_rgba(0,0,0,0.2)] transition hover:brightness-105 lg:text-xl"
    >
      <Link href="/club" className="flex items-center gap-2.5">
        동아리 찾아보기
        <Image
          src="/main/arrow.svg"
          alt="동아리 찾아보기 버튼"
          width={15}
          height={12}
          className="h-[12px] w-[15px] lg:h-[14px] lg:w-[18px]"
        />
      </Link>
    </Button>
  );
}

export default NavigateClubList;
