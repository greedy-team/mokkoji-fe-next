import ClubDetailCommentInput from '@/features/club-detail/ui/club-detail-comment-input';
import ClubDetailComment from '@/features/club-detail/ui/club-detail-comment';
import getClubDetailComments from '@/widgets/club-detail/api/getClubDetailComments';

interface ClubCommentsWidgetProps {
  clubId: number;
}

async function ClubCommentsWidget({ clubId }: ClubCommentsWidgetProps) {
  const data = await getClubDetailComments(clubId);
  const comments = data.data?.comments ?? [];
  const commentList = [...comments].reverse();

  return (
    <section className="w-full pt-12">
      <ClubDetailCommentInput clubId={clubId} count={commentList.length} />
      <ClubDetailComment comments={commentList} clubId={clubId} />
    </section>
  );
}

export default ClubCommentsWidget;
