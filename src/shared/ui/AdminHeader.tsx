import Image from 'next/image';
import Link from 'next/link';
import ScrollProgressBar from './scroll-progress-bar';

function AdminHeader() {
  return (
    <>
      <ScrollProgressBar />
      <header className="fixed top-0 right-0 left-0 z-50 flex h-[60px] items-center gap-2 bg-black px-4 text-base font-medium text-white sm:gap-4 sm:px-8 lg:gap-6 lg:px-[150px]">
        <Link
          href="/"
          className="flex flex-shrink-0 items-center gap-1 text-lg font-bold sm:gap-1.5 sm:text-xl lg:text-2xl"
        >
          <Image
            src="/header/mokkojiLogoWhite.svg"
            alt="모꼬지 로고"
            width={24}
            height={24}
            className="h-5 w-5 sm:h-6 sm:w-6 lg:h-6 lg:w-6"
          />
          <span>Mokkoji</span>
        </Link>
        <span>|</span>
        <Link href="/admin">
          <span>관리자 페이지</span>
        </Link>
      </header>
    </>
  );
}

export default AdminHeader;
