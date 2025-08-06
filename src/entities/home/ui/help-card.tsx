import AnimateOnView from '@/features/home/util/animate-viewport';
import Image from 'next/image';

function HelpCard() {
  return (
    <div className="flex w-[50%] justify-center">
      <div className="relative flex h-[260px] w-[400px] items-end justify-center rounded-2xl bg-[#D2FBD9]">
        <AnimateOnView animation="laptop">
          <Image
            src="/main/help.svg"
            alt="고객센터 페이지"
            width={366}
            height={250}
          />
        </AnimateOnView>
      </div>
    </div>
  );
}

export default HelpCard;
