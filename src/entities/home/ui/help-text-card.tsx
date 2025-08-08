import AnimateOnView from '@/features/home/util/animate-viewport';

function HelpTextCard() {
  return (
    <div className="flex h-full w-full flex-col justify-center px-4 lg:w-[50%] lg:px-0">
      <AnimateOnView animation="animate-fade-left">
        <h4 className="mb-2 text-lg font-bold text-[#00E457] sm:text-xl lg:text-2xl">
          고객센터
        </h4>
      </AnimateOnView>
      <AnimateOnView animation="reveal">
        <p className="my-2 text-lg font-bold sm:my-3 sm:text-2xl lg:text-3xl">
          서비스에 대해 궁금한 점을 검색해{' '}
          <span className="hidden lg:inline">
            <br />
          </span>
          답변을 확인할 수 있어요.
        </p>
      </AnimateOnView>
      <AnimateOnView animation="reveal-rightToleft">
        <span className="my-2 text-base font-semibold text-[#9C9C9C] sm:my-3 sm:text-lg lg:text-2xl">
          자주 하는 질문은 검색 페이지에서 바로 답변을 확인할 수 있어요.
        </span>
      </AnimateOnView>
    </div>
  );
}

export default HelpTextCard;
