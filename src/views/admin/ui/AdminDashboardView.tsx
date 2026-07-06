import type {
  ClubMasterApplication,
  ClubApplication,
} from '@/features/admin/model/dashboard-types';
import ClubMasterApplicationWidget from '@/widgets/admin/ui/ClubMasterApplicationWidget';

interface AdminDashboardViewProps {
  clubMasterApplications: ClubMasterApplication[];
  clubApplications: ClubApplication[];
  totalClubs: number;
  pendingMasterCount: number;
  pendingClubCount: number;
  totalMasters: number;
}

function AdminDashboardView({
  clubMasterApplications,
  clubApplications,
  totalClubs,
  pendingMasterCount,
  pendingClubCount,
  totalMasters,
}: AdminDashboardViewProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-[20px] leading-[140%] font-semibold tracking-[-0.03em] text-[#000000]">
          전체 동아리 현황
        </h2>
        <p className="text-[14px] leading-[140%] font-medium tracking-[-0.03em] text-[#8B95A1]">
          학교 동아리 현황과 신청을 한눈에 관리할 수 있어요.
        </p>
      </div>
      <div className="flex items-center gap-5">
        <div className="relative h-[117px] w-[176px] rounded-[20px] bg-[#F8F8F8]">
          <span className="absolute top-4 left-5 text-[16px] leading-[140%] font-medium text-[#474747]">
            등록된 동아리
          </span>
          <span className="absolute right-5 bottom-4 text-[36px] leading-[140%] font-bold text-[#474747]">
            {totalClubs}개
          </span>
        </div>
        <div className="relative h-[117px] w-[176px] rounded-[20px] bg-[#F8F8F8]">
          <span className="absolute top-4 left-5 text-[16px] leading-[140%] font-medium text-[#474747]">
            승인 대기
          </span>
          <span className="absolute right-5 bottom-4 text-[36px] leading-[140%] font-bold text-[#474747]">
            {pendingMasterCount}건
          </span>
        </div>
        <div className="relative h-[117px] w-[176px] rounded-[20px] bg-[#F8F8F8]">
          <span className="absolute top-4 left-5 text-[16px] leading-[140%] font-medium text-[#474747]">
            신규 신청
          </span>
          <span className="absolute right-5 bottom-4 text-[36px] leading-[140%] font-bold text-[#474747]">
            {pendingClubCount}건
          </span>
        </div>
        <div className="relative h-[117px] w-[176px] rounded-[20px] bg-[#F8F8F8]">
          <span className="absolute top-4 left-5 text-[16px] leading-[140%] font-medium text-[#474747]">
            전체 동아리장
          </span>
          <span className="absolute right-5 bottom-4 text-[36px] leading-[140%] font-bold text-[#474747]">
            {totalMasters}명
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-[20px] leading-[140%] font-semibold tracking-[-0.03em] text-[#000000]">
            최근 승인 대기 신청
          </h3>
          <p className="text-[14px] leading-[140%] font-medium tracking-[-0.03em] text-[#8B95A1]">
            현재 승인 대기 중인 신청을 확인하고 처리할 수 있어요.
          </p>
        </div>
        <ClubMasterApplicationWidget
          initialClubApplications={clubApplications}
          initialClubMasterApplications={clubMasterApplications}
        />
      </div>
    </div>
  );
}

export default AdminDashboardView;
