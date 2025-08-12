import HelpCard from '@/entities/home/ui/help-card';
import HelpTextCard from '@/entities/home/ui/help-text-card';

function HelpCardWidget() {
  return (
    <div className="mt-40 flex h-[550px] flex-col-reverse items-center pt-60 pb-40 lg:mb-60 lg:h-[300px] lg:flex-row">
      <HelpCard />
      <HelpTextCard />
    </div>
  );
}

export default HelpCardWidget;
