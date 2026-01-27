import CategoryTextCard from '@/entities/home/ui/category-text-card';
import CommentTextCard from '@/entities/home/ui/comment-text-card';
import AnimateOnView from '@/features/home/util/animate-viewport';
import Image from 'next/image';

function FeatureIntroduceMobileWidget() {
  return (
    <div className="flex flex-col gap-50">
      <div className="flex h-fit flex-col items-center pt-40">
        <CommentTextCard />
        <AnimateOnView animation="reveal">
          <Image
            src="/main/sampleComment.png"
            alt="댓글 이미지"
            width={449}
            height={150}
          />
        </AnimateOnView>
      </div>
      <div className="relative mb-20 flex h-fit w-full flex-col items-center gap-13 pb-20">
        <CategoryTextCard />
        <AnimateOnView animation="reveal">
          <Image
            src="/main/sampleCategory.png"
            alt="카테고리 이미지"
            width={341}
            height={96}
          />
        </AnimateOnView>
      </div>
    </div>
  );
}

export default FeatureIntroduceMobileWidget;
