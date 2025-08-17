import ScrollTopButton from '@/features/recruit/ui/scroll-top-button';
import Search from '@/features/support/ui/search';
import FAQList from '@/widgets/support/faq-list';

function SupportPage() {
  return (
    <>
      <Search />
      <FAQList />
      <ScrollTopButton />
    </>
  );
}

export default SupportPage;
