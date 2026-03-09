import { formatDateDotted } from '@/entities/club/util/getDateUtil';
import cn from '@/shared/lib/utils';

interface PeriodSectionProps {
  startDate?: string;
  endDate?: string;
  hasDecoration?: boolean;
  className?: string;
  isAlwaysRecruiting: boolean;
}

function PeriodSection({
  startDate,
  endDate,
  hasDecoration = true,
  className,
  isAlwaysRecruiting,
}: PeriodSectionProps) {
  const hasDate = startDate && endDate;
  if (!hasDate) {
    return <span className="block min-h-[1lh] text-xs" />;
  }

  return isAlwaysRecruiting ? (
    <span className={cn(`text-xs leading-none ${className}`)}>상시모집</span>
  ) : (
    <span className={cn(`text-xs leading-none ${className}`)}>
      {hasDecoration ? (
        <span className="text-[#8B95A1]">
          모집기한 · {formatDateDotted(startDate!)}~{formatDateDotted(endDate!)}
        </span>
      ) : (
        <span className="text[#0A0A0A]">
          모집기한 | {formatDateDotted(startDate!)}~{formatDateDotted(endDate!)}
        </span>
      )}
    </span>
  );
}

export default PeriodSection;
