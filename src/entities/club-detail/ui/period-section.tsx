import getDateUtil, {
  formatToMonthDay,
} from '@/entities/club/util/getDateUtil';
import cn from '@/shared/lib/utils';

interface PeriodSectionProps {
  startDate?: string;
  endDate?: string;
  decoration?: boolean;
  className?: string;
}

function PeriodSection({
  startDate,
  endDate,
  decoration = true,
  className,
}: PeriodSectionProps) {
  if (!startDate || !endDate) {
    return (
      <span className={cn(`text-xs text-[#8B95A1] ${className}`)}>
        상시모집
      </span>
    );
  }

  const isEndOfYear = getDateUtil(endDate);

  return isEndOfYear ? (
    <span className={cn(`text-xs text-[#8B95A1] ${className}`)}>상시모집</span>
  ) : (
    <span className={cn(`text-xs leading-none ${className}`)}>
      {decoration ? (
        <span className="text-[#8B95A1]">모집기한 · </span>
      ) : (
        <span>모집기한 | </span>
      )}
      <span className="text-[#8B95A1]">
        {formatToMonthDay(startDate)}~{formatToMonthDay(endDate)}
      </span>
    </span>
  );
}

export default PeriodSection;
