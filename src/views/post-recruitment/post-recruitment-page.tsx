import { DetailParams } from '@/shared/model/type';
import PostRecruitmentWidget from '@/widgets/post-recruitment/post-recruitment-widget';
import SharedLoading from '@/shared/ui/loading';
import { Suspense } from 'react';

function PostRecruitmentPage({ params }: DetailParams) {
  return (
    <div>
      <h1 className="text-2xl font-bold">모집 공고 작성</h1>
      <Suspense fallback={<SharedLoading />}>
        <PostRecruitmentWidget params={params} />
      </Suspense>
    </div>
  );
}

export default PostRecruitmentPage;
