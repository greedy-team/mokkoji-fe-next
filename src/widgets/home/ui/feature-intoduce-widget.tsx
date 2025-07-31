import CommentTextCard from '@/entities/home/ui/comment-text-card';

function FeatureIntroduceWidget() {
  return (
    <div className="flex flex-col gap-40">
      <div className="flex h-[450px] flex-col items-center pt-20">
        <CommentTextCard />
      </div>
    </div>
  );
}

export default FeatureIntroduceWidget;
