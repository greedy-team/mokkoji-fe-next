import ClubDetailCommentInput from '@/features/club-detail/ui/club-detail-comment-input';
import { CommentType } from '@/widgets/recruit-detail/model/type';
import ClubDetailComment from '@/features/club-detail/ui/club-detail-comment';
import getClubDetailComments from '../api/getClubDetailComments';

interface CommentWidgetProps {
  clubId: number;
}

async function ClubDetailCommentWidget({ clubId }: CommentWidgetProps) {
  let commentList: CommentType[] = [];

  const data = await getClubDetailComments(clubId);
  commentList = data.data.comments.reverse();

  return (
    <section className="mt-13 w-full">
      <ClubDetailCommentInput clubId={clubId} count={commentList.length} />
      <ClubDetailComment comments={commentList} clubId={clubId} />
    </section>
  );
}

export default ClubDetailCommentWidget;
