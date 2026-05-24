import Image from 'next/image';
import Link from 'next/link';

function DashboardHeader() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex h-[85px] items-center gap-4 bg-white px-[139px]">
      <Link
        href="/"
        className="flex flex-shrink-0 items-center gap-1.5 text-2xl font-bold text-[#000000]"
      >
        <Image
          src="/header/mokkojiLogo.svg"
          alt="모꼬지 로고"
          width={24}
          height={24}
        />
        <span>Mokkoji</span>
      </Link>
      <span className="text-[#000000]">|</span>
      <span className="text-[20px] leading-[24px] font-medium tracking-[-0.04em] text-[#000000]">
        총동아리연합회
      </span>
    </header>
  );
}

export default DashboardHeader;
