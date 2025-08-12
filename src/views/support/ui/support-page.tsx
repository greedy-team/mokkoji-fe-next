import Search from '@/features/support/ui/search';
import FAQList from '@/widgets/support/faq-list';

function SupportPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <Search />
      <FAQList />
    </div>
  );
}

export default SupportPage;
