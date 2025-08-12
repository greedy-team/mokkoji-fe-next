import AnimateOnView from '@/features/home/util/animate-viewport';
import Image from 'next/image';

function CategoryCard() {
  return (
    <div className="absolute top-[65%] left-[10%] lg:top-[39%] lg:left-[25%]">
      <div className="relative">
        <AnimateOnView animation="animate-fade-left-2">
          <Image
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
