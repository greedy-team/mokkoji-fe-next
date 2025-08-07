import AnimateOnView from '@/features/home/util/animate-viewport';
import Image from 'next/image';

function CategoryCard() {
  return (
    <div className="flex h-full w-full items-center justify-center lg:w-[50%]">
      <div className="relative">
        <AnimateOnView animation="animate-fade-left-2">
          <Image
            src="/main/category.png"
            alt="카테고리 배경"
            width={750}
            height={200}
            className="w-full max-w-[600px] lg:w-auto"
          />
        </AnimateOnView>
      </div>
    </div>
  );
}

export default CategoryCard;
