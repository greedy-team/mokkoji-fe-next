import Link from 'next/link';
import DeleteIcon from '@/shared/ui/icons/delete-icon';

interface ClubManagementRowProps {
  index: number;
  clubId: number;
  universityCode: string;
  name: string;
  category: string;
  disabled?: boolean;
  onDelete: () => void;
}

function ClubManagementRow({
  index,
  clubId,
  universityCode,
  name,
  category,
  disabled,
  onDelete,
}: ClubManagementRowProps) {
  return (
    <div className="flex w-full items-center border-b border-[#D6D6D6] py-3">
      <span className="w-[80px] text-[14px] leading-[140%] font-medium text-[#474747]">
        {index}
      </span>
      <Link
        href={`/${universityCode}/club/${clubId}`}
        className="flex-1 text-[14px] leading-[140%] font-medium text-[#474747] hover:underline"
      >
        {name}
      </Link>
      <span className="w-[160px] text-[14px] leading-[140%] font-medium text-[#474747]">
        {category}
      </span>
      <button
        type="button"
        onClick={onDelete}
        disabled={disabled}
        className="flex items-center gap-1.5 rounded-lg border border-[#F04452] px-3 py-1.5 text-[13px] leading-[140%] font-medium text-[#F04452] transition-colors hover:bg-[#FFF0F1] disabled:cursor-not-allowed disabled:opacity-50"
      >
        삭제하기
        <DeleteIcon width={14} height={14} />
      </button>
    </div>
  );
}

export default ClubManagementRow;
