import Search from '@/features/support/ui/search';
import FAQList from '@/widgets/support/faq-list';
import BugInfoButton from '@/features/support/ui/bug-info-button';

function SupportPage() {
  return (
    <>
      <Search />
      <FAQList />
      <BugInfoButton />
    </>
  );
}

export default SupportPage;
