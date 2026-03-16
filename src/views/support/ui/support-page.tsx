import Search from '@/features/support/ui/search';
import FAQList from '@/widgets/support/faq-list';
import BugInfoButton from '@/features/support/ui/bug-info-button';
import PageContainer from '@/shared/ui/page-container';

function SupportPage() {
  return (
    <PageContainer>
      <Search />
      <FAQList />
      <BugInfoButton />
    </PageContainer>
  );
}

export default SupportPage;
