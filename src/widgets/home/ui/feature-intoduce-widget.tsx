import CategoryCard from '@/entities/home/ui/category-card';
import CategoryTextCard from '@/entities/home/ui/category-text-card';
import CommentCard from '@/entities/home/ui/comment-card';
import CommentTextCard from '@/entities/home/ui/comment-text-card';

function FeatureIntroduceWidget() {
  return (
    <div className="flex flex-col gap-6 sm:gap-12 lg:gap-20">
      <div className="flex h-auto flex-col items-center gap-8 pt-20 sm:pt-32 lg:h-[550px] lg:gap-0 lg:pt-40">
        <CommentTextCard />
        <CommentCard />
      </div>
      <div className="relative flex h-auto w-full flex-col items-center gap-8 pt-30 sm:pt-16 lg:h-[550px] lg:flex-row lg:gap-0 lg:pt-20">
        <div
          className="pointer-events-none absolute top-0 left-0 z-10 mt-[15%] h-[50%] w-full"
          style={{
            backgroundImage:
              'linear-gradient(to right, #F8FAFB 25%, transparent 60%)',
          }}
        />
        <div className="flex w-full flex-col gap-8 lg:flex-row lg:gap-0">
          <CategoryTextCard />
          <div className="block lg:hidden">
            <CategoryCard />
          </div>
        </div>
        <div className="hidden lg:block">
          <CategoryCard />
        </div>
      </div>
    </div>
  );
}

export default FeatureIntroduceWidget;
