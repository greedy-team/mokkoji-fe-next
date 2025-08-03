import RecruitDetailComment from '@/entities/recruit-detail/ui/recruit-detail-comment';
import RecruitDetailCommentInput from '@/features/recruit-detail/ui/recruit-detail-comment-input';
import { auth } from '@/auth';
import getClubDetailComments from '../api/getClubDetailComments';
import { CommentType } from '../model/type';

interface CommentWidgetProps {
  clubId: number;
}

async function RecruitDetailCommentWidget({ clubId }: CommentWidgetProps) {
  const session = await auth();
  let commentList: CommentType[] = [];
  if (session?.accessToken) {
    const data = await getClubDetailComments(clubId, session?.accessToken);
    commentList = data.data.comments;
  }

  return (
    <section className="mt-13">
      <RecruitDetailCommentInput clubId={clubId} count={commentList.length} />
      <RecruitDetailComment comments={commentList} />
    </section>
  );
}

export default RecruitDetailCommentWidget;
