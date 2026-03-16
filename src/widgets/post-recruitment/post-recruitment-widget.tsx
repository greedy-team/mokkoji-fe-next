import PostRecruitmentForm from '@/features/post-recruitment/ui/post-recruitment-form';
import { getClubInfo } from '@/shared/api/manage-api';
import { DetailParams } from '@/shared/model/type';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';

async function PostRecruitmentWidget({ params }: DetailParams) {
  const { id } = await params;
  const clubInfoResponse = await getClubInfo(Number(id));

  if (!clubInfoResponse.ok) {
    return <ErrorBoundaryUi />;
  }

  return (
    <PostRecruitmentForm clubInfo={clubInfoResponse.data} clubId={Number(id)} />
  );
}

export default PostRecruitmentWidget;
