import Link from 'next/link';

interface ClubApplicationBannerProps {
  universityCode: string;
}

function ClubApplicationBanner({ universityCode }: ClubApplicationBannerProps) {
  return (
    <Link
      href={`/${universityCode}/club-application`}
      className="flex w-full items-center justify-between rounded-lg bg-[#3C475A] px-4 py-6"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">💌</span>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-white">우리 동아리를</span>
          <span className="text-lightmode-tag text-sm font-bold">
            더 많은 학생들에게 알려보세요!
          </span>
        </div>
      </div>
      <div className="text-lightmode-tag rounded-full bg-[#545F70] px-3 py-2 text-sm font-medium whitespace-nowrap">
        동아리 등록하기
      </div>
    </Link>
  );
}

export default ClubApplicationBanner;
