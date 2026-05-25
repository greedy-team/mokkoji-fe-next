interface ClubTableRowProps {
  universityName: string;
  name: string;
  category: string;
  affiliation: string;
  clubMaster: { id: number; name: string; email: string } | null;
}

function Cell({
  width,
  children,
}: {
  width: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`${width} text-[16px] leading-[19px] font-normal text-[#000000]`}
    >
      {children}
    </span>
  );
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
      <Cell width="w-[160px]">{name}</Cell>
      <Cell width="w-[120px]">{universityName}</Cell>
      <Cell width="w-[100px]">{category}</Cell>
      <Cell width="w-[100px]">{affiliation}</Cell>
      <Cell width="flex-1">{clubMaster ? clubMaster.name : '-'}</Cell>
      <Cell width="w-[200px]">{clubMaster ? clubMaster.email : '-'}</Cell>
      <span
        className={`text-[14px] leading-[140%] font-medium tracking-[-0.03em] ${clubMaster ? 'text-[#22CF64]' : 'text-[#8B95A1]'}`}
      >
        {clubMaster ? '연결됨' : '미연결'}
      </span>
    </div>
  );
}

export default ClubTableRow;
