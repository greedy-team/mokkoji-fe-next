import Search from '@/features/support/ui/search';
import FAQList from '@/widgets/support/faq-list';
import BugInfoButton from '@/features/support/ui/bug-info-button';
import ScrollProgressBar from '@/shared/ui/scroll-progress-bar';

function SupportPage() {
  return (
    <>
      <ScrollProgressBar />
      <Search />
      <FAQList />
      <BugInfoButton />
    </>
  );
}

export default SupportPage;
