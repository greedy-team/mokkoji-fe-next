import { DetailParams } from '@/shared/model/type';
import PostRecruitmentWidget from '@/widgets/post-recruitment/post-recruitment-widget';

function PostRecruitmentPage({ params }: DetailParams) {
  return <PostRecruitmentWidget params={params} />;
}

export default PostRecruitmentPage;
