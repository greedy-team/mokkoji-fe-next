import AnimateOnView from '@/features/home/util/animate-viewport';

function HelpTextCard() {
  return (
    <div className="flex h-full w-[50%] flex-col justify-center">
      <AnimateOnView animation="animate-fade-left">
        <h4 className="text-2xl font-bold text-[#00E457]">고객센터</h4>
      </AnimateOnView>
      <AnimateOnView animation="reveal">
        <p className="my-3 text-3xl font-bold">
          서비스에 대해 궁금한 점을 검색해
          <br />
          답변을 확인할 수 있어요.
        </p>
      </AnimateOnView>
      <AnimateOnView animation="reveal-rightToleft">
        <span className="my-3 text-2xl font-semibold text-[#9C9C9C]">
          자주 하는 질문은 검색 페이지에서 바로 답변을 확인할 수 있어요.
        </span>
      </AnimateOnView>
    </div>
  );
}

export default HelpTextCard;
