import Search from '@/features/support/ui/search';
import FAQList from '@/widgets/support/faq-list';

function SupportPage() {
  return (
    <div className="flex w-full flex-col items-center">
      <Search />
      <FAQList />
    </div>
  );
}

export default SupportPage;
