import { auth } from '@/auth';
import ClubEditForm from '@/features/club-register/ui/club-edit-form';
import ClubRegisterForm from '@/features/club-register/ui/club-register-form';
import { getClubInfo } from '@/shared/api/manage-api';
import { DetailParams, UserRole } from '@/shared/model/type';
import getParams from '@/shared/util/getParams';
import { toast } from 'react-toastify';

async function ClubRegisterWidget({ params }: DetailParams) {
  const session = await auth();
  const accessToken = session?.accessToken;
  const role = session?.role;
  const { id } = await getParams({ params });
  let clubName: string | undefined;

  try {
    if (accessToken) {
      const response = await getClubInfo(Number(id), accessToken);
      clubName = response.data.name;
    }
  } catch (err) {
    console.error(err);
    toast.warn('동아리 정보를 불러오는데 실패했습니다.');
  }

  return (
    <div className="w-[30%]">
      <h1 className="my-6 text-2xl font-bold">
        {role === UserRole.CLUB_MASTER ? '동아리 정보 수정' : '동아리 등록'}
      </h1>
      {(role === UserRole.CLUB_ADMIN || role === UserRole.GREEDY_ADMIN) && (
        <ClubRegisterForm accessToken={accessToken} />
      )}
      {role === UserRole.CLUB_MASTER && <ClubEditForm />}
    </div>
  );
}

export default ClubRegisterWidget;
