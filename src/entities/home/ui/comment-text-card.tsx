import AnimateOnView from '@/features/home/util/animate-viewport';
import Image from 'next/image';

function CommentTextCard() {
  return (
    <div className="flex h-[50%] w-full flex-col items-center px-4">
      <AnimateOnView animation="animate-fade-left">
        <h4 className="mb-2 flex gap-2 text-lg font-bold text-[#00E457] sm:text-xl lg:text-2xl">
          <Image
            src="/main/comment.svg"
            alt="댓글 아이콘"
            width={26}
            height={24}
            className="h-5 w-5 sm:h-6 sm:w-6 lg:h-6 lg:w-7"
          />
          상세 페이지 댓글
        </h4>
      </AnimateOnView>
      <AnimateOnView animation="reveal">
        <p className="my-2 text-center text-lg font-bold sm:my-3 sm:text-2xl lg:text-3xl">
          동아리에 대한 의견이나, 궁금한 점을 댓글로{' '}
          <br className="hidden sm:block" />
          남기고 <span className="text-[#00E457]">소통할 수 있어요.</span>
        </p>
      </AnimateOnView>
    </div>
  );
}

export default CommentTextCard;
