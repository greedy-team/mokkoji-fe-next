import { auth } from '@/auth';
import ClubRegisterHeader from '@/entities/club-register/ui/club-register-header';
import {
  getManagedClub,
  getManagedClubInfo,
} from '@/features/club-register/api/postClubRegister';
import ClubRegisterForm from '@/features/club-register/ui/club-register-form';
import { UserRole } from '@/shared/model/type';

async function ClubRegisterWidget() {
  const session = await auth();
  const role = session?.role;
  const accessToken = session?.accessToken;
  let clubData;
  let clubInfoData;
  let clubLogo;

  try {
    if (accessToken) {
      const response = await getManagedClub(accessToken);
      [clubData] = response.data.clubs;
    }

    if (clubData?.clubId && accessToken) {
      const { data } = await getManagedClubInfo(accessToken, clubData.clubId);
      const { logo, ...restClubInfoData } = data;

      clubInfoData = restClubInfoData;
      clubLogo = logo;
    }
  } catch (err) {
    console.error(err);
  }

  return (
    <div className="w-[30%]">
      <ClubRegisterHeader>
        {role === UserRole.CLUB_MASTER ? '동아리 정보 수정' : '동아리 등록'}
      </ClubRegisterHeader>
      {role && accessToken && (
        <ClubRegisterForm
          role={role}
          clubData={clubData}
          clubInfoData={clubInfoData}
          accessToken={accessToken}
          clubLogo={clubLogo}
        />
      )}
    </div>
  );
}

export default ClubRegisterWidget;
