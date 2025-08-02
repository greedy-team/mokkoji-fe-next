import { auth } from '@/auth';
import ClubRegisterHeader from '@/entities/club-register/ui/club-register-header';
import ClubRegisterForm from '@/features/club-register/ui/club-register-form';
import { UserRole } from '@/shared/model/type';

async function ClubRegisterWidget() {
  const session = await auth();
  const role = session?.role;

  return (
    <div className="w-[30%]">
      <ClubRegisterHeader>
        {role === UserRole.CLUB_MASTER ? '동아리 정보 수정' : '동아리 등록'}
      </ClubRegisterHeader>
      {role && <ClubRegisterForm role={role} />}
    </div>
  );
}

export default ClubRegisterWidget;
