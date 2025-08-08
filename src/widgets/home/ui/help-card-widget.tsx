import HelpCard from '@/entities/home/ui/help-card';
import HelpTextCard from '@/entities/home/ui/help-text-card';

function HelpCardWidget() {
  return (
    <div className="mb-20 flex h-auto flex-col items-center gap-8 pt-20 sm:mb-40 sm:pt-40 lg:mb-60 lg:h-[300px] lg:flex-row lg:gap-0 lg:pt-60">
      <HelpCard />
      <HelpTextCard />
    </div>
  );
}

export default HelpCardWidget;
