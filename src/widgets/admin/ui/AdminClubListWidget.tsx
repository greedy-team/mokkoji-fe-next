import type { AdminClub } from '@/features/admin/model/dashboard-types';
import ClubTableRow from '@/features/admin/ui/ClubTableRow';

interface AdminClubListWidgetProps {
  clubs: AdminClub[];
}

function AdminClubListWidget({ clubs }: AdminClubListWidgetProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center border-t border-b border-[#8B95A1] py-2">
          <span className="w-[160px] text-[16px] leading-[140%] font-medium text-[#000000]">
            동아리명
          </span>
          <span className="w-[120px] text-[16px] leading-[140%] font-medium text-[#000000]">
            학교명
          </span>
          <span className="w-[100px] text-[16px] leading-[140%] font-medium text-[#000000]">
            분류
          </span>
          <span className="w-[100px] text-[16px] leading-[140%] font-medium text-[#000000]">
            소속
          </span>
          <span className="flex-1 text-[16px] leading-[140%] font-medium text-[#000000]">
            동아리장
          </span>
          <span className="w-[200px] text-[16px] leading-[140%] font-medium text-[#000000]">
            이메일
          </span>
          <span className="w-[60px] text-[16px] leading-[140%] font-medium text-[#000000]">
            상태
          </span>
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
