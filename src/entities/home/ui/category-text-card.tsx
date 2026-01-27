import AnimateOnView from '@/features/home/util/animate-viewport';

function CategoryTextCard() {
  return (
    <div className="z-20 flex h-[50%] w-full flex-col justify-center gap-2 lg:h-full lg:w-[50%]">
      <AnimateOnView animation="animate-fade-left">
        <h4 className="text-primary-500 text-sm font-bold lg:text-2xl">
          카테고리 별 동아리 검색
        </h4>
      </AnimateOnView>
      <AnimateOnView animation="reveal">
        <p className="text-text-primary my-1 text-2xl leading-[1.5] font-semibold lg:my-3 lg:w-[70%] lg:text-3xl lg:font-bold">
          동아리의 최신 모집 공고를
          <br className="lg:hidden" /> 빠르게 확인할 수 있어요.
        </p>
      </AnimateOnView>
      <AnimateOnView animation="reveal-rightToleft">
        <span className="text-text-tertiary my-1 block w-full text-base leading-[1.5] font-medium lg:my-3 lg:w-[90%] lg:text-2xl lg:font-semibold">
          관심있는 분야의 동아리를 필터링으로
          <br className="lg:hidden" />
          빠르게 찾아볼 수 있어요.
        </span>
      </AnimateOnView>
    </div>
  );
}

export default CategoryTextCard;
