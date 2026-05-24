interface ClubTableRowProps {
  universityName: string;
  name: string;
  category: string;
  affiliation: string;
  clubMaster: { id: number; name: string; email: string } | null;
}

function ClubTableRow({
  universityName,
  name,
  category,
  affiliation,
  clubMaster,
}: ClubTableRowProps) {
  return (
    <div className="flex w-full items-center border-b border-[#D6D6D6] py-2.5">
      <span className="w-[160px] text-[16px] leading-[19px] font-normal text-[#000000]">
        {name}
      </span>
      <span className="w-[120px] text-[16px] leading-[19px] font-normal text-[#000000]">
        {universityName}
      </span>
      <span className="w-[100px] text-[16px] leading-[19px] font-normal text-[#000000]">
        {category}
      </span>
      <span className="w-[100px] text-[16px] leading-[19px] font-normal text-[#000000]">
        {affiliation}
      </span>
      <span className="flex-1 text-[16px] leading-[19px] font-normal text-[#000000]">
        {clubMaster ? clubMaster.name : '-'}
      </span>
      <span className="w-[200px] text-[16px] leading-[19px] font-normal text-[#000000]">
        {clubMaster ? clubMaster.email : '-'}
      </span>
      <span
        className={
          clubMaster
            ? 'text-[14px] leading-[140%] font-medium tracking-[-0.03em] text-[#22CF64]'
            : 'text-[14px] leading-[140%] font-medium tracking-[-0.03em] text-[#8B95A1]'
        }
      >
        {clubMaster ? '연결됨' : '미연결'}
      </span>
    </div>
  );
}

export default ClubTableRow;
