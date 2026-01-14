import { RecruitmentActionParams } from '@/shared/model/type';
import AdminClubDescriptionPage from '@/views/admin-club-description/admin-club-description-page';

function Page({ params }: RecruitmentActionParams) {
  return <AdminClubDescriptionPage params={params} />;
}

export default Page;
