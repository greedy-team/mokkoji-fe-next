import AnimateOnView from '@/features/home/util/animate-viewport';

function RecruitTextCard() {
  return (
    <div className="flex h-[50%] w-full flex-col justify-center gap-2 lg:h-full lg:w-[50%]">
      <AnimateOnView animation="animate-fade-left">
        <h1 className="text-primary-500 text-sm font-bold lg:text-2xl">
          모집 공고
        </h1>
      </AnimateOnView>
      <AnimateOnView animation="reveal">
        <p className="my-1 w-full text-2xl leading-[1.5] font-semibold lg:my-3 lg:w-[90%] lg:text-3xl lg:font-bold">
          동아리의 최신 모집 공고를
          <br className="lg:hidden" />
          빠르게 확인할 수 있어요.
        </p>
      </AnimateOnView>
      <AnimateOnView animation="reveal-rightToleft">
        <span className="text-text-tertiary my-1 block w-full text-base leading-[1.5] font-medium lg:my-3 lg:w-[88%] lg:text-2xl lg:font-semibold">
          동아리 모집 공고 설명 및 모집 기간과 현재 모집 중인지,{' '}
          <br className="lg:hidden" /> 모집이 완료된 상태인지 확인할 수 있어요.
        </span>
      </AnimateOnView>
    </div>
  );
}

export default RecruitTextCard;
