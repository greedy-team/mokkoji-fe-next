import Link from 'next/link';

function Footer() {
  return (
    <footer className="flex h-[74px] w-full items-center justify-center gap-10 text-sm text-[#545454]">
      <p className="cursor-default">
        COPYRIGHT @ 2025 모꼬지. ALL RIGHT RESERVERD.
      </p>
      <Link href="/bug-report" className="underline">
        버그 제보
      </Link>
    </footer>
  );
}

export default Footer;
