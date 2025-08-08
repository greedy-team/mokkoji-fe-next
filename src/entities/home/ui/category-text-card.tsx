import AnimateOnView from '@/features/home/util/animate-viewport';

function CategoryTextCard() {
  return (
    <div className="z-20 flex h-[50%] w-full flex-col justify-center lg:h-full lg:w-[50%]">
      <AnimateOnView animation="animate-fade-left">
        <h4 className="text-2xl font-bold text-[#00E457]">
          카테고리 별 동아리 검색
        </h4>
      </AnimateOnView>
      <AnimateOnView animation="reveal">
        <p className="my-1 w-[85%] text-2xl font-bold lg:my-3 lg:w-[70%] lg:text-3xl">
          관심있는 분야만 필터링해서 빠르게 동아리를 검색할 수 있어요.
        </p>
      </AnimateOnView>
    </div>
  );
}

export default CategoryTextCard;
