import RecruitDetailComment from '@/features/recruit-detail/ui/recruit-detail-comment';
import RecruitDetailCommentInput from '@/features/recruit-detail/ui/recruit-detail-comment-input';
import { auth } from '@/auth';
import getClubDetailComments from '../api/getClubDetailComments';
import { CommentType } from '../model/type';

interface CommentWidgetProps {
  clubId: number;
}

async function RecruitDetailCommentWidget({ clubId }: CommentWidgetProps) {
  const session = await auth();
  const accessToken = session?.accessToken;
  let commentList: CommentType[] = [];

  if (session?.accessToken) {
    const data = await getClubDetailComments(clubId, session?.accessToken);
    commentList = data.data.comments.reverse();
  }

  return (
    <section className="mt-13 w-full">
      <RecruitDetailCommentInput
        clubId={clubId}
        count={commentList.length}
        accessToken={accessToken}
      />
      <RecruitDetailComment
        comments={commentList}
        accessToken={accessToken}
        clubId={clubId}
      />
    </section>
  );
}

export default RecruitDetailCommentWidget;
