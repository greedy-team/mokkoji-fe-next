import getMyInfo from '../api/getMyInfo';
import EmailChangeDialog from './email-change-dialog';

async function MyPage() {
  const myInfo = await getMyInfo();
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-[600px]">
        <h1 className="text-xl font-bold">마이페이지</h1>
        <div className="mt-5 mb-7 w-full border-3 border-b border-[#F8F8F8]" />
        <ul className="space-y-4">
          <li>
            <span className="mr-2 font-bold">학번</span> {myInfo.user.studentId}
          </li>
          <li>
            <span className="mr-2 font-bold">학과</span>{' '}
            {myInfo.user.department}
          </li>
          <li>
            <span className="mr-2 font-bold">이름</span> {myInfo.user.name}
          </li>
          <li>
            <span className="mr-2 font-bold">학년</span> {myInfo.user.grade}
          </li>
          <li>
            <span className="mr-2 font-bold">이메일</span> {myInfo.user.email}
            <EmailChangeDialog
              initialEmail={myInfo.user.email}
              triggerClassName="text-[#00E457] bg-transparent border-none cursor-pointer ml-8"
            />
          </li>
        </ul>
      </div>
    </main>
  );
}

export default MyPage;
