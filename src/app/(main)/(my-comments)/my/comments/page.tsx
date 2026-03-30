import { getSession } from '@/shared/lib/cookie-session';
import LoginRequired from '@/shared/ui/login-required';
import getMyComments from '@/widgets/my-comment/api/getMyComments';
import MyCommentList from '@/widgets/my-comment/ui/MyCommentList';

export default async function MyCommentsPage() {
  const session = await getSession();

  if (!session) {
    return <LoginRequired />;
  }

  const result = await getMyComments();

  if (!result.ok || !result.data) {
    return null;
  }

  return (
    <div className="flex w-full flex-col">
      <h1 className="text-text-secondary mb-6 text-2xl font-bold">
        내가 작성한 댓글
      </h1>
      <div className="px-4">
        <MyCommentList comments={result.data.comments} />
      </div>
    </div>
  );
}
