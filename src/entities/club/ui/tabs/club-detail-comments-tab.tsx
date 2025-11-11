import ClubDetailCommentInput from '@/features/club-detail/ui/club-detail-comment-input';
import { CommentType } from '@/widgets/recruit-detail/model/type';
import ClubDetailComment from '@/features/club-detail/ui/club-detail-comment';

interface ClubDetailCommentsTabProps {
  clubId: number;
  comments?: CommentType[];
}

function ClubDetailCommentsTab({
  clubId,
  comments = [],
}: ClubDetailCommentsTabProps) {
  const commentList = [...comments].reverse();

  return (
    <section className="mt-8 w-full">
      <ClubDetailCommentInput clubId={clubId} count={commentList.length} />
      <ClubDetailComment comments={commentList} clubId={clubId} />
    </section>
  );
}

export default ClubDetailCommentsTab;
