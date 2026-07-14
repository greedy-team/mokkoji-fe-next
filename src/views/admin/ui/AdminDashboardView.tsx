import type {
  AdminRole,
  DashboardSummary,
} from '@/features/admin/model/dashboard-types';
import ClubMasterApplicationWidget from '@/widgets/admin/ui/ClubMasterApplicationWidget';
import AdminUniversitySelectWidget from '@/widgets/admin/ui/AdminUniversitySelectWidget';
import type { UniversityOption } from '@/entities/university/model/type';

interface AdminDashboardViewProps {
  summary: DashboardSummary;
  role: AdminRole;
  universities: UniversityOption[];
  selectedCode: string;
}

function AdminDashboardView({
  summary,
  role,
  universities,
  selectedCode,
}: AdminDashboardViewProps) {
  const {
    clubMasterApplications,
    clubApplications,
    totalClubs,
    pendingMasterCount,
    pendingClubCount,
    totalMasters,
  } = summary;
  const isMokkojiAdmin = role === 'MOKKOJI_ADMIN';
  const selectedUniversityName =
    universities.find((university) => university.code === selectedCode)?.name ??
    selectedCode;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-end">
        {isMokkojiAdmin ? (
          <AdminUniversitySelectWidget
            universities={universities}
            selectedCode={selectedCode}
          />
        ) : (
          <span className="text-[16px] leading-[140%] font-medium text-[#474747]">
            {selectedUniversityName}
          </span>
        )}
      </div>

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
            key={selectedCode}
            initialClubApplications={clubApplications}
            initialClubMasterApplications={clubMasterApplications}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardView;
