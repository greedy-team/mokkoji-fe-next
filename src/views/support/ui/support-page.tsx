import Search from '@/features/support/ui/search';
import FAQList from '@/widgets/support/faq-list';
import BugInfoButton from '@/features/support/ui/bug-info-button';
import ClubApplicationButton from '@/features/support/ui/club-application-button';
import ScrollProgressBar from '@/shared/ui/scroll-progress-bar';

interface SupportPageProps {
  universityCode: string;
}

function SupportPage({ universityCode }: SupportPageProps) {
  return (
    <>
      <ScrollProgressBar />
      <Search />
      <ClubApplicationButton universityCode={universityCode} />
      <FAQList />
      <BugInfoButton />
    </>
  );
}

export default SupportPage;
