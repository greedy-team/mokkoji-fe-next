import ClubDetailCommentInput from '@/features/club-detail/ui/club-detail-comment-input';
import { CommentType } from '@/widgets/recruit-detail/model/type';
import ClubDetailComment from '@/features/club-detail/ui/club-detail-comment';
import { CommentsResponse } from '../api/getClubDetailComments';

function ClubDetailCommentWidget({
  clubId,
  commentData,
}: {
  clubId: number;
  commentData: CommentsResponse;
}) {
  let commentList: CommentType[] = [];

  if (commentData && commentData.data && commentData.data.comments) {
    commentList = commentData.data.comments.reverse();
  }

  return (
    <section className="mt-13 w-full">
      <ClubDetailCommentInput clubId={clubId} count={commentList.length} />
      <ClubDetailComment comments={commentList} clubId={clubId} />
    </section>
  );
}

export default ClubDetailCommentWidget;
