import AnimateOnView from '@/features/home/util/animate-viewport';

function CategoryCard() {
  return (
    <div className="absolute top-[39%] left-[25%]">
      <div className="relative">
        <AnimateOnView animation="animate-fade-left-2">
          <img
            src="/main/category.png"
            alt="카테고리 배경"
            width={750}
            height={200}
          />
        </AnimateOnView>
        <div className="pointer-events-none absolute top-0 left-0 z-20 h-full w-80 bg-gradient-to-r from-[#F8FAFB] to-transparent" />
      </div>
    </div>
  );
}

export default CategoryCard;
