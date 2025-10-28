import SharedLoading from '@/shared/ui/loading';
import ClubEditWidget from '@/widgets/club-register/ui/club-edit-widget';
import { Suspense } from 'react';
import { DetailParams } from '@/shared/model/type';

function ClubEditPage({ params }: DetailParams) {
  return (
    <div className="w-[90%] lg:w-[30%]">
      <h1 className="my-6 text-2xl font-bold">동아리 정보 수정</h1>
      <Suspense fallback={<SharedLoading />}>
        <ClubEditWidget params={params} />
      </Suspense>
    </div>
  );
}

export default ClubEditPage;
