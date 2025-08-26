import Link from 'next/link';
import AnimateOnView from '@/features/home/util/animate-viewport';

function RecruitTextCard() {
  return (
    <div className="flex h-[50%] w-full flex-col justify-center lg:h-full lg:w-[50%]">
      <AnimateOnView animation="animate-fade-left">
        <h4 className="text-lg font-bold text-[#00E457] lg:text-2xl">
          <Link href="/recruit">모집 공고</Link>
        </h4>
      </AnimateOnView>
      <AnimateOnView animation="reveal">
        <p className="my-1 w-full text-2xl leading-[1.5] font-bold lg:my-3 lg:w-[90%] lg:text-3xl">
          관심있는 동아리의 최신 모집 공고를 빠르게 확인할 수 있어요.
        </p>
      </AnimateOnView>
      <AnimateOnView animation="reveal-rightToleft">
        <span className="text-md my-1 block w-full leading-[1.5] font-semibold text-[#9C9C9C] lg:my-3 lg:w-[88%] lg:text-2xl">
          동아리 모집 공고 설명 및 모집 기간과 현재 모집 중인지, 모집이 완료된
          상태인지 확인할 수 있어요.
        </span>
      </AnimateOnView>
    </div>
  );
}

export default RecruitTextCard;
