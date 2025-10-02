import RecruitHeader from '@/entities/recruit/ui/recruit-header';
import RecruitItemList from '@/widgets/recruit/ui/recruit-item-list';
import ScrollTopButton from '@/features/recruit/ui/scroll-top-button';
import { auth } from '@/auth';

async function RecruitPage() {
  const session = await auth();

  return (
    <>
      <div className="w-full sm:w-4xl lg:w-6xl">
        <RecruitHeader />
        <RecruitItemList session={session} />
      </div>
      <ScrollTopButton />
    </>
  );
}
export default RecruitPage;
