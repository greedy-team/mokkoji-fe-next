import AnimateOnView from '@/features/home/util/animate-viewport';

function RecruitTextCard() {
  return (
    <div className="flex h-full w-full flex-col justify-center px-4 lg:w-[50%] lg:px-0">
      <AnimateOnView animation="animate-fade-left">
        <h4 className="text-lg font-bold text-[#00E457] sm:text-xl lg:text-2xl">
          모집 공고
        </h4>
      </AnimateOnView>
      <AnimateOnView animation="reveal">
        <p className="my-2 w-full text-xl font-bold sm:my-3 sm:text-2xl lg:w-[85%] lg:text-3xl">
          관심있는 동아리의 최신 모집 공고를 빠르게 확인할 수 있어요.
        </p>
      </AnimateOnView>
      <AnimateOnView animation="reveal-rightToleft">
        <span className="my-2 text-base font-semibold text-[#9C9C9C] sm:my-3 sm:text-lg lg:text-2xl">
          동아리 모집 공고 설명 및 모집 기간과 현재 모집 중인지,{' '}
          <br className="hidden sm:block" />
          모집이 완료된 상태인지 확인할 수 있어요.
        </span>
      </AnimateOnView>
    </div>
  );
}

export default RecruitTextCard;
