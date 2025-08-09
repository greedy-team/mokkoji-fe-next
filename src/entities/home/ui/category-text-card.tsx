import AnimateOnView from '@/features/home/util/animate-viewport';

function CategoryTextCard() {
  return (
    <div className="z-50 flex h-full w-full flex-col justify-center px-4 lg:w-[50%] lg:px-0">
      <AnimateOnView animation="animate-fade-left">
        <h4 className="text-lg font-bold text-[#00E457] sm:text-xl lg:text-2xl">
          카테고리 별 동아리 검색
        </h4>
      </AnimateOnView>
      <AnimateOnView animation="reveal">
        <p className="my-2 text-lg font-bold sm:my-3 sm:text-2xl lg:text-3xl">
          관심있는 분야만 필터링해서 빠르게 동아리를{' '}
          <span className="hidden lg:inline">
            <br />
          </span>
          검색할 수 있어요.
        </p>
      </AnimateOnView>
    </div>
  );
}

export default CategoryTextCard;
