import PostRecruitmentForm from '@/features/post-recruitment/ui/post-recruitment-form';
import { getClubInfo } from '@/shared/api/manage-api';
import { DetailParams } from '@/shared/model/type';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';

async function PostRecruitmentWidget({ params }: DetailParams) {
  const { id } = await params;
  const res = await getClubInfo(Number(id));

  if (!res.ok) {
    return <ErrorBoundaryUi />;
  }

  return <PostRecruitmentForm clubInfo={res.data} clubId={Number(id)} />;
}

export default PostRecruitmentWidget;
