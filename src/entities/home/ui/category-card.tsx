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
      </div>
    </div>
  );
}

export default CategoryCard;
