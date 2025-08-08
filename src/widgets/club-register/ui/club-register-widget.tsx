import { auth } from '@/auth';
import ClubRegisterForm from '@/features/club-register/ui/club-register-form';

async function ClubRegisterWidget() {
  const session = await auth();
  const accessToken = session?.accessToken;

  return (
    <div className="w-[30%]">
      <h1 className="my-6 text-2xl font-bold">동아리 등록</h1>
      <ClubRegisterForm accessToken={accessToken} />
    </div>
  );
}

export default ClubRegisterWidget;
