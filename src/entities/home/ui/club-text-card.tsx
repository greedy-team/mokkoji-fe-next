import Link from 'next/link';
import AnimateOnView from '@/features/home/util/animate-viewport';

function ClubTextCard() {
  return (
    <div className="flex h-[50%] w-full flex-col justify-center lg:h-full lg:w-[50%]">
      <AnimateOnView animation="animate-fade-left">
        <h1 className="text-lg font-bold text-[#00E457] lg:text-2xl">
          <Link href="/club">전체 동아리</Link>
        </h1>
      </AnimateOnView>
      <AnimateOnView animation="reveal">
        <p className="my-1 w-full text-2xl leading-[1.5] font-bold lg:my-3 lg:w-[90%] lg:text-3xl">
          세종대 동아리들을 한눈에 확인해요.
        </p>
      </AnimateOnView>
      <AnimateOnView animation="reveal-rightToleft">
        <span className="text-md my-1 block w-full leading-[1.5] font-semibold text-[#9C9C9C] lg:my-3 lg:w-[90%] lg:text-2xl">
          간단한 동아리 설명과 동아리 카테고리를 확인할 수 있어요.
        </span>
      </AnimateOnView>
    </div>
  );
}

export default ClubTextCard;
