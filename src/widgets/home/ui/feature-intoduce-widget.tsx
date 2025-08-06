import CategoryCard from '@/entities/home/ui/category-card';
import CategoryTextCard from '@/entities/home/ui/category-text-card';
import CommentCard from '@/entities/home/ui/comment-card';
import CommentTextCard from '@/entities/home/ui/comment-text-card';

function FeatureIntroduceWidget() {
  return (
    <div className="flex flex-col gap-20">
      <div className="flex h-[550px] flex-col items-center pt-40">
        <CommentTextCard />
        <CommentCard />
      </div>
      <div className="relative mb-20 flex h-[550px] w-full items-center pt-20">
        <div
          className="pointer-events-none absolute top-0 left-0 z-10 mt-[15%] h-[50%] w-full"
          style={{
            backgroundImage:
              'linear-gradient(to right, #F8FAFB 25%, transparent 60%)',
          }}
        />
        <CategoryTextCard />
        <CategoryCard />
      </div>
    </div>
  );
}

export default FeatureIntroduceWidget;
