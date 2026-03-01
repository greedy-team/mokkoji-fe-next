import Link from 'next/link';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex w-full shrink-0 flex-col">
      <div className="flex h-[74px] w-full items-center justify-center gap-4 text-[10px] text-[#545454] lg:gap-10 lg:text-sm">
        <p className="cursor-default">
          COPYRIGHT @ {currentYear} 모꼬지. ALL RIGHT RESERVED.
        </p>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSdYOTZnswSrOIkqXGrqSurvQJgNyeBFVf_CjvyYGetgfq3o7g/viewform?usp=dialog"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-500 underline"
        >
          버그 제보
        </a>
        <Link href="/privacy-policy" className="text-primary-500 underline">
          개인정보처리방침
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
