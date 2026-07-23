import { RecruitmentActionParams } from '@/shared/model/type';
import AdminRecruitmentPage from '@/views/admin-recruitment/admin-recruitment-page';

function Page({ params }: RecruitmentActionParams) {
  return <AdminRecruitmentPage params={params} />;
}

export default Page;
