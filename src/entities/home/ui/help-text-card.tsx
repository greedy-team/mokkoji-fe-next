import Link from 'next/link';
import AnimateOnView from '@/features/home/util/animate-viewport';

function HelpTextCard() {
  return (
    <div className="flex h-full w-full flex-col justify-center lg:w-[50%]">
      <AnimateOnView animation="animate-fade-left">
        <h4 className="text-primary-500 text-lg font-bold lg:text-2xl">
          <Link href="/help">고객센터</Link>
        </h4>
      </AnimateOnView>
      <AnimateOnView animation="reveal">
        <p className="text-text-primary my-1 text-2xl leading-[1.5] font-bold lg:my-3 lg:w-[65%] lg:text-3xl">
          서비스에 대해 궁금한 점을 검색해 답변을 확인할 수 있어요.
        </p>
      </AnimateOnView>
      <AnimateOnView animation="reveal-rightToleft">
        <span className="text-md text-text-tertiary my-1 block leading-[1.5] font-semibold lg:my-3 lg:text-2xl">
          자주 하는 질문은 검색 페이지에서 바로 답변을 확인할 수 있어요.
        </span>
      </AnimateOnView>
    </div>
  );
}

export default HelpTextCard;
