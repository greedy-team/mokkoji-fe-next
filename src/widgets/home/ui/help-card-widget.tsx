import HelpCard from '@/entities/home/ui/help-card';
import HelpTextCard from '@/entities/home/ui/help-text-card';

function HelpCardWidget() {
  return (
    <div className="mb-60 flex h-[300px] items-center pt-60">
      <HelpCard />
      <HelpTextCard />
    </div>
  );
}

export default HelpCardWidget;
