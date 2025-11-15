import ClubDetailCommentInput from '@/features/club-detail/ui/club-detail-comment-input';
import { CommentType } from '@/widgets/recruit-detail/model/type';
import ClubDetailComment from '@/features/club-detail/ui/club-detail-comment';
import getClubDetailComments from '@/widgets/club-detail/api/getClubDetailComments';

interface ClubDetailCommentsTabProps {
  clubId: number;
}

async function ClubDetailCommentsTab({ clubId }: ClubDetailCommentsTabProps) {
  const data = await getClubDetailComments(clubId);
  const comments = data.data?.comments ?? [];
  const commentList = [...comments].reverse();

  return (
    <section className="mt-8 w-full">
      <ClubDetailCommentInput clubId={clubId} count={commentList.length} />
      <ClubDetailComment comments={commentList} clubId={clubId} />
    </section>
  );
}

export default ClubDetailCommentsTab;
