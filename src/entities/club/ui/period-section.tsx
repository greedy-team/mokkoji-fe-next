import getDateUtil, {
  formatToMonthDay,
} from '@/entities/recruit/lib/getDateUtil';
import cn from '@/shared/lib/utils';

interface PeriodSectionProps {
  startDate: string;
  endDate: string;
  decoration?: boolean;
  className?: string;
}

function PeriodSection({
  startDate,
  endDate,
  decoration = true,
  className,
}: PeriodSectionProps) {
  const isEndOfYear = getDateUtil(endDate);

  return isEndOfYear ? (
    <span className={cn(`text-xs font-semibold ${className}`)}>상시모집</span>
  ) : (
    <span className={cn(`text-xs leading-1 font-semibold ${className}`)}>
      {decoration ? (
        <p className="text-gray-400">모집기한</p>
      ) : (
        <span>모집기한 | </span>
      )}
      {formatToMonthDay(startDate)} ~ {formatToMonthDay(endDate)}
    </span>
  );
}

export default PeriodSection;
