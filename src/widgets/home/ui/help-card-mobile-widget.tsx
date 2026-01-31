import HelpTextCard from '@/entities/home/ui/help-text-card';
import AnimateOnView from '@/features/home/util/animate-viewport';
import Image from 'next/image';

function HelpCardMobileWidget() {
  return (
    <div className="mt-20 flex h-fit flex-col items-center gap-13 pt-60 pb-40">
      <HelpTextCard />
      <AnimateOnView animation="reveal">
        <Image
          src="/main/sampleFaq.png"
          alt="faq 이미지"
          width={245}
          height={496}
        />
      </AnimateOnView>
    </div>
  );
}

export default HelpCardMobileWidget;
