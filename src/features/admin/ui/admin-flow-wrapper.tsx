import { auth } from '@/auth';
import getClubManageInfo from '@/shared/api/manage-api';
import AdminFlowContainer from './admin-flow-container';

async function AdminFlowWrapper() {
  const session = await auth();
  const role = session?.role;
  const response = await getClubManageInfo({ role });
  const allowedClubs = response.data?.clubs || [];

  if (!allowedClubs.length) {
    return (
      <div className="text-center">
        <p className="text-xl font-semibold">권한이 없습니다</p>
        <p className="mt-2 text-sm text-gray-400">
          관리 가능한 동아리가 없습니다.
        </p>
      </div>
    );
  }

  return <AdminFlowContainer allowedClubs={allowedClubs} role={role} />;
}

export default AdminFlowWrapper;
