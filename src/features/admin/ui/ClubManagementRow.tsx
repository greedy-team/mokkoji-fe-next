interface ClubManagementRowProps {
  index: number;
  name: string;
  category: string;
  onDelete: () => void;
}

function ClubManagementRow({
  index,
  name,
  category,
  onDelete,
}: ClubManagementRowProps) {
  return (
    <div className="flex w-full items-center border-b border-[#D6D6D6] py-3">
      <span className="w-[80px] text-[14px] leading-[140%] font-medium text-[#474747]">
        {index}
      </span>
      <span className="flex-1 text-[14px] leading-[140%] font-medium text-[#474747]">
        {name}
      </span>
      <span className="w-[160px] text-[14px] leading-[140%] font-medium text-[#474747]">
        {category}
      </span>
      <button
        type="button"
        onClick={onDelete}
        className="flex items-center gap-1.5 rounded-lg border border-[#F04452] px-3 py-1.5 text-[13px] leading-[140%] font-medium text-[#F04452] transition-colors hover:bg-[#FFF0F1]"
      >
        삭제하기
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.75 3.5H12.25M5.25 3.5V2.333A.583.583 0 0 1 5.833 1.75h2.334A.583.583 0 0 1 8.75 2.333V3.5M11.083 3.5l-.583 8.167A.583.583 0 0 1 9.917 12.25H4.083a.583.583 0 0 1-.583-.583L2.917 3.5"
            stroke="#F04452"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

export default ClubManagementRow;
