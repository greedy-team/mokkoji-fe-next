import AnimateOnView from '@/features/home/util/animate-viewport';

function ClubTextCard() {
  return (
    <div className="flex h-full w-full flex-col justify-center px-4 lg:w-[50%] lg:px-0">
      <AnimateOnView animation="animate-fade-left">
        <h4 className="text-lg font-bold text-[#00E457] sm:text-xl lg:text-2xl">
          전체 동아리
        </h4>
      </AnimateOnView>
      <AnimateOnView animation="reveal">
        <p className="my-2 w-full text-xl font-bold sm:my-3 sm:text-2xl lg:w-72 lg:text-3xl">
          우리 학교의 동아리들을 한눈에 확인해요.
        </p>
      </AnimateOnView>
      <AnimateOnView animation="reveal-rightToleft">
        <span className="my-2 text-base font-semibold text-[#9C9C9C] sm:my-3 sm:text-lg lg:text-2xl">
          간단한 동아리 설명과 동아리 카테고리를 확인할 수 있어요.
        </span>
      </AnimateOnView>
    </div>
  );
}

export default ClubTextCard;
