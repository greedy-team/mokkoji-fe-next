import ClubDetailCommentInput from '@/features/club-detail/ui/club-detail-comment-input';
import { auth } from '@/auth';

import { CommentType } from '@/widgets/recruit-detail/model/type';
import ClubDetailComment from '@/features/club-detail/ui/club-detail-comment';
import getClubDetailComments from '../api/getClubDetailComments';

interface CommentWidgetProps {
  clubId: number;
}

async function ClubDetailCommentWidget({ clubId }: CommentWidgetProps) {
  const session = await auth();
  const accessToken = session?.accessToken;
  let commentList: CommentType[] = [];

  if (session?.accessToken) {
    const data = await getClubDetailComments(clubId, session?.accessToken);
    commentList = data.data.comments.reverse();
  }

  return (
    <section className="mt-13 w-full">
      <ClubDetailCommentInput
        clubId={clubId}
        count={commentList.length}
        accessToken={accessToken}
      />
      <ClubDetailComment
        comments={commentList}
        accessToken={accessToken}
        clubId={clubId}
      />
    </section>
  );
}

export default ClubDetailCommentWidget;
