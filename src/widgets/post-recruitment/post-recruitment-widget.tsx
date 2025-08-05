import PostRecruitmentForm from '@/features/post-recruitment/ui/post-recruitment-form';

function PostRecruitmentWidget() {
  return (
    <div className="flex w-full flex-col">
      <h1 className="text-2xl font-bold">모집 공고 작성</h1>
      <PostRecruitmentForm />
    </div>
  );
}

export default PostRecruitmentWidget;
