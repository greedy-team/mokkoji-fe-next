import ClubRegisterForm from '@/features/club-register/ui/club-register-form';
import SharedLoading from '@/shared/ui/loading';
import { Suspense } from 'react';

async function ClubRegisterWidget() {
  return (
    <div className="w-[90%] lg:w-[30%]">
      <h1 className="my-6 text-2xl font-bold">동아리 등록</h1>
      <Suspense fallback={<SharedLoading />}>
        <ClubRegisterForm />
      </Suspense>
    </div>
  );
}

export default ClubRegisterWidget;
