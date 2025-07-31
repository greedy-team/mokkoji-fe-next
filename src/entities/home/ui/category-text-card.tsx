import AnimateOnView from '@/features/home/util/animate-viewport';

function CategoryTextCard() {
  return (
    <div className="z-50 flex h-full w-[50%] flex-col justify-center">
      <AnimateOnView animation="animate-fade-left">
        <h4 className="text-2xl font-bold text-[#00E457]">
          카테고리 별 동아리 검색
        </h4>
      </AnimateOnView>
      <AnimateOnView animation="reveal">
        <p className="my-3 text-3xl font-bold">
          관심있는 분야만 필터링해서 빠르게 동아리를
          <br />
          검색할 수 있어요.
        </p>
      </AnimateOnView>
    </div>
  );
}

export default CategoryTextCard;
