import CommentCard from '@/entities/home/ui/comment-card';
import CommentTextCard from '@/entities/home/ui/comment-text-card';

function FeatureIntroduceWidget() {
  return (
    <div className="flex flex-col gap-40">
      <div className="flex h-[550px] flex-col items-center pt-20">
        <CommentTextCard />
        <CommentCard />
      </div>
    </div>
  );
}

export default FeatureIntroduceWidget;
