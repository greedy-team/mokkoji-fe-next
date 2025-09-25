import { auth } from '@/auth';
import { UserRole, UserRoleLabel } from '@/shared/model/type';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import getMyInfo from '../api/getMyInfo';
import EmailChangeDialog from './email-change-dialog';

async function MyPage() {
  const myInfo = await getMyInfo();
  const session = await auth();
  if (!myInfo.ok || !myInfo.data) {
    return <ErrorBoundaryUi />;
  }
  return (
    <div className="flex flex-col items-center">
      <div className="w-auto sm:w-[500px] lg:w-[700px]">
        <h1 className="text-xl font-bold">마이페이지</h1>
        <div className="mt-5 mb-7 w-full border-3 border-b border-[#F8F8F8]" />
        <ul className="space-y-4">
          <li>
            <span className="mr-2 font-bold">학번</span>{' '}
            {myInfo.data.user.studentId}
          </li>
          <li>
            <span className="mr-2 font-bold">학과</span>{' '}
            {myInfo.data.user.department}
          </li>
          <li>
            <span className="mr-2 font-bold">이름</span> {myInfo.data.user.name}
          </li>
          <li>
            <span className="mr-2 font-bold">학년</span>{' '}
            {myInfo.data.user.grade}
          </li>
          <li>
            <span className="mr-2 font-bold">이메일</span>{' '}
            {myInfo.data.user.email}
            <EmailChangeDialog
              initialEmail={myInfo.data.user.email}
              triggerClassName="text-[#00E457] bg-transparent border-none cursor-pointer ml-8"
            />
          </li>
          <li>
            <span className="mr-2 font-bold">역할</span>
            {
              UserRoleLabel[
                (session?.user?.role as UserRole) || UserRole.NORMAL
              ]
            }
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MyPage;
