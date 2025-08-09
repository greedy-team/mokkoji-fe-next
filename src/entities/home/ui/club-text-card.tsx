import AnimateOnView from '@/features/home/util/animate-viewport';

function ClubTextCard() {
  return (
    <div className="flex h-[50%] w-full flex-col justify-center lg:h-full lg:w-[50%]">
      <AnimateOnView animation="animate-fade-left">
        <h4 className="text-2xl font-bold text-[#00E457]">전체 동아리</h4>
      </AnimateOnView>
      <AnimateOnView animation="reveal">
        <p className="my-1 w-full text-3xl font-bold lg:my-3 lg:w-[90%]">
          우리 학교의 동아리들을 한눈에 확인해요.
        </p>
      </AnimateOnView>
      <AnimateOnView animation="reveal-rightToleft">
        <span className="my-1 block w-full text-lg font-semibold text-[#9C9C9C] lg:my-3 lg:w-[90%] lg:text-2xl">
          간단한 동아리 설명과 동아리 카테고리를 확인할 수 있어요.
        </span>
      </AnimateOnView>
    </div>
  );
}

export default ClubTextCard;
