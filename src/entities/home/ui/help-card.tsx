import AnimateOnView from '@/features/home/util/animate-viewport';
import Image from 'next/image';

function HelpCard() {
  return (
    <div className="flex w-full justify-center lg:w-[50%]">
      <div className="relative flex h-[200px] w-[300px] items-end justify-center rounded-2xl bg-[#D2FBD9] sm:h-[220px] sm:w-[350px] lg:h-[260px] lg:w-[400px]">
        <AnimateOnView animation="laptop">
          <Image
            src="/main/help.svg"
            alt="고객센터 페이지"
            width={366}
            height={250}
            className="w-full max-w-[300px] sm:max-w-[350px] lg:max-w-[366px]"
          />
        </AnimateOnView>
      </div>
    </div>
  );
}

export default HelpCard;
