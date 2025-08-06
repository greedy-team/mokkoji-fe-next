import { auth } from '@/auth';
import ClubEditForm from '@/features/club-register/ui/club-edit-form';
import { getClubInfo } from '@/shared/api/manage-api';
import { ClubInfoType, DetailParams } from '@/shared/model/type';
import getParams from '@/shared/util/getParams';
import { toast } from 'react-toastify';

async function ClubEditWidget({ params }: DetailParams) {
  const session = await auth();
  const accessToken = session?.accessToken;
  const { id } = await getParams({ params });
  let clubInfo: ClubInfoType | undefined;

  try {
    if (accessToken) {
      const response = await getClubInfo(Number(id), accessToken);
      clubInfo = response.data;
    }
  } catch (err) {
    console.error(err);
    toast.warn('동아리 정보를 불러오는데 실패했습니다.');
  }

  return (
    <div className="w-[30%]">
      <h1 className="my-6 text-2xl font-bold">동아리 정보 수정</h1>
      <ClubEditForm
        clubInfo={clubInfo}
        accessToken={accessToken}
        clubId={Number(id)}
      />
    </div>
  );
}

export default ClubEditWidget;
