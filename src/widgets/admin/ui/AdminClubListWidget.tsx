import type { AdminClub } from '@/features/admin/model/dashboard-types';
import TableHeaderCell from '@/features/admin/ui/TableHeaderCell';
import ClubTableRow from '@/features/admin/ui/ClubTableRow';

interface AdminClubListWidgetProps {
  clubs: AdminClub[];
}

function AdminClubListWidget({ clubs }: AdminClubListWidgetProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center border-t border-b border-[#8B95A1] py-2">
          <TableHeaderCell width="w-[160px]">동아리명</TableHeaderCell>
          <TableHeaderCell width="w-[120px]">학교명</TableHeaderCell>
          <TableHeaderCell width="w-[100px]">분류</TableHeaderCell>
          <TableHeaderCell width="w-[100px]">소속</TableHeaderCell>
          <TableHeaderCell width="flex-1">동아리장</TableHeaderCell>
          <TableHeaderCell width="w-[200px]">이메일</TableHeaderCell>
          <TableHeaderCell width="w-[60px]">상태</TableHeaderCell>
        </div>
        {clubs.length === 0 ? (
          <div className="py-8 text-center text-[16px] leading-[140%] font-medium text-[#8B95A1]">
            등록된 동아리가 없습니다.
          </div>
        ) : (
          clubs.map((club) => (
            <ClubTableRow
              key={club.id}
              universityName={club.universityName}
              name={club.name}
              category={club.category}
              affiliation={club.affiliation}
              clubMaster={club.clubMaster}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default AdminClubListWidget;
