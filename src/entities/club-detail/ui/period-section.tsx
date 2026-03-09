import { formatDateDotted } from '@/entities/club/util/getDateUtil';
import cn from '@/shared/lib/utils';

interface PeriodSectionProps {
  startDate?: string;
  endDate?: string;
  isDecorated?: boolean;
  className?: string;
  isAlwaysRecruiting: boolean;
}

function PeriodSection({
  startDate,
  endDate,
  isDecorated = true,
  className,
  isAlwaysRecruiting,
}: PeriodSectionProps) {
  const isDateAvailable = startDate && endDate;
  if (!isDateAvailable) {
    return <span className="block min-h-[1lh] text-xs" />;
  }

  return isAlwaysRecruiting ? (
    <span className={cn(`text-xs leading-none ${className}`)}>상시모집</span>
  ) : (
    <span className={cn(`text-xs leading-none ${className}`)}>
      {isDecorated ? (
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
