import getDateUtil, {
  formatToMonthDay,
} from '@/entities/recruit/lib/getDateUtil';

interface PeriodSectionProps {
  startDate: string;
  endDate: string;
  decoration?: boolean;
}

function PeriodSection({
  startDate,
  endDate,
  decoration = true,
}: PeriodSectionProps) {
  const isEndOfYear = getDateUtil(endDate);

  return isEndOfYear ? (
    <span className="text-center text-xs font-semibold">상시모집</span>
  ) : (
    <span className="text-center text-xs font-semibold">
      {decoration ? '모집기한 • ' : '모집기한 | '}
      {formatToMonthDay(startDate)} ~ {formatToMonthDay(endDate)}
    </span>
  );
}

export default PeriodSection;
