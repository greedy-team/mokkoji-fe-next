import AnimateOnView from '@/shared/ui/animate-on-view';
import Image from 'next/image';
import mainCategoryImage from '@/shared/assets/images/main/category.webp';

function CategoryCard() {
  return (
    <div className="absolute top-[60%] left-[10%] lg:top-[35%] lg:left-[28%]">
      <div className="relative">
        <AnimateOnView animation="animate-fade-left-2">
          <Image
            src={mainCategoryImage}
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
