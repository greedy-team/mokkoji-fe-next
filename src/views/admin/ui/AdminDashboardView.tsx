import type {
  ClubMasterApplication,
  ClubApplication,
  AdminRole,
} from '@/features/admin/model/dashboard-types';
import ClubMasterApplicationWidget from '@/widgets/admin/ui/ClubMasterApplicationWidget';
import AdminUniversitySelectWidget from '@/widgets/admin/ui/AdminUniversitySelectWidget';
import type { UniversityOption } from '@/entities/university/model/type';

interface AdminDashboardViewProps {
  clubMasterApplications: ClubMasterApplication[];
  clubApplications: ClubApplication[];
  role: AdminRole;
  universities: UniversityOption[];
  selectedCode: string;
}

function AdminDashboardView({
  clubMasterApplications,
  clubApplications,
  role,
  universities,
  selectedCode,
}: AdminDashboardViewProps) {
  const isMokkojiAdmin = role === 'MOKKOJI_ADMIN';
  const selectedUniversityName =
    universities.find((university) => university.code === selectedCode)?.name ??
    selectedCode;

  return (
    <div className="flex flex-col gap-8 px-[140px] pt-4 pb-10">
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="flex h-[50px] cursor-pointer items-center justify-center rounded-[30px] bg-[#4AF38A] px-5 text-[16px] leading-[140%] font-medium text-[#000000]"
        >
          대시보드
        </button>
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

      <div className="flex flex-col gap-1">
        <h2 className="text-[20px] leading-[140%] font-semibold tracking-[-0.03em] text-[#000000]">
          승인 대기 신청
        </h2>
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
  );
}

export default AdminDashboardView;
