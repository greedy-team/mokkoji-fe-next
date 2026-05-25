import TableDataCell from './TableDataCell';

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
      <TableDataCell width="w-[160px]">{name}</TableDataCell>
      <TableDataCell width="w-[120px]">{universityName}</TableDataCell>
      <TableDataCell width="w-[100px]">{category}</TableDataCell>
      <TableDataCell width="w-[100px]">{affiliation}</TableDataCell>
      <TableDataCell width="flex-1">
        {clubMaster ? clubMaster.name : '-'}
      </TableDataCell>
      <TableDataCell width="w-[200px]">
        {clubMaster ? clubMaster.email : '-'}
      </TableDataCell>
      <span
        className={`text-[14px] leading-[140%] font-medium tracking-[-0.03em] ${clubMaster ? 'text-[#22CF64]' : 'text-[#8B95A1]'}`}
      >
        {clubMaster ? '연결됨' : '미연결'}
      </span>
    </div>
  );
}

export default ClubTableRow;
