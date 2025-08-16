import ClubRegisterForm from '@/features/club-register/ui/club-register-form';

async function ClubRegisterWidget() {
  return (
    <div className="w-[90%] lg:w-[30%]">
      <h1 className="my-6 text-2xl font-bold">동아리 등록</h1>
      <ClubRegisterForm />
    </div>
  );
}

export default ClubRegisterWidget;
