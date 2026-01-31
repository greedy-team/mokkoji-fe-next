import AnimateOnView from '@/features/home/util/animate-viewport';

function ClubTextCard() {
  return (
    <div className="flex h-[50%] w-full flex-col justify-center gap-2 lg:h-full lg:w-[50%]">
      <AnimateOnView animation="animate-fade-left">
        <h1 className="text-primary-500 text-sm font-bold lg:text-2xl">
          전체 동아리
        </h1>
      </AnimateOnView>
      <AnimateOnView animation="reveal">
        <p className="my-1 w-full text-2xl leading-[1.5] font-semibold lg:my-3 lg:w-[90%] lg:text-3xl lg:font-bold">
          세종대 동아리들을
          <br className="lg:hidden" />
          한눈에 확인해요.
        </p>
      </AnimateOnView>
      <AnimateOnView animation="reveal-rightToleft">
        <span className="text-text-tertiary my-1 block w-full text-base leading-[1.5] font-medium lg:my-3 lg:w-[90%] lg:text-2xl lg:font-semibold">
          간단한 동아리 설명과
          <br className="lg:hidden" />
          동아리 카테고리를 확인할 수 있어요.
        </span>
      </AnimateOnView>
    </div>
  );
}

export default ClubTextCard;
