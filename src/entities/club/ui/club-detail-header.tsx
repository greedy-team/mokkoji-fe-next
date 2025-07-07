import PeriodSection from '@/entities/recruit/ui/period-section';
import getStatus from '@/shared/lib/getStatus';
import RadiusTag from '@/shared/ui/radius-tag';
import Image from 'next/image';

interface ClubDetailHeaderProps {
  title: string;
  category: string;
  startDate: string;
  endDate: string;
}

function ClubDetailHeader({
  title,
  category,
  startDate,
  endDate,
}: ClubDetailHeaderProps) {
  return (
    <>
      <header className="border-b border-b-[#D6D6D6] pb-4">
        <div className="mb-4 flex flex-row items-center gap-5">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-2xl font-bold text-[#9C9C9C]">{category} 동아리</p>
        </div>
        <div className="mb-2 flex flex-row items-center gap-2 text-xl">
          <RadiusTag
            label={getStatus(endDate).text}
            className={`${getStatus(endDate).backColor} ${getStatus(endDate).fontColor} w-[60px]`}
          />
          <PeriodSection startDate={startDate} endDate={endDate} />
        </div>
      </header>
      <div className="mt-2 mb-10 flex flex-row items-center gap-2">
        <Image
          src="/instagram.svg"
          alt="인스타그램"
          width={30}
          height={30}
          className="cursor-pointer"
        />
      </div>
    </>
  );
}

export default ClubDetailHeader;
