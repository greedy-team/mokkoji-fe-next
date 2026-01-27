import AnimateOnView from '@/features/home/util/animate-viewport';

function CategoryTextCard() {
  return (
    <div className="z-20 flex h-[50%] w-full flex-col justify-center lg:h-full lg:w-[50%]">
      <AnimateOnView animation="animate-fade-left">
        <h4 className="text-primary-500 text-lg font-bold lg:text-2xl">
          카테고리 별 동아리 검색
        </h4>
      </AnimateOnView>
      <AnimateOnView animation="reveal">
        <p className="text-text-primary my-1 text-2xl leading-[1.5] font-bold lg:my-3 lg:w-[70%] lg:text-3xl">
          관심있는 분야만 필터링해서 빠르게 동아리를 검색할 수 있어요.
        </p>
      </AnimateOnView>
    </div>
  );
}

export default CategoryTextCard;
