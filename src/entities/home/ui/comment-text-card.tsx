import AnimateOnView from '@/features/home/util/animate-viewport';
import Image from 'next/image';
import Link from 'next/link';

function CommentTextCard() {
  return (
    <div className="mb-10 flex h-[50%] w-full flex-col items-center justify-center lg:mb-20">
      <AnimateOnView animation="animate-fade-left">
        <h1 className="mb-2 flex gap-2 text-sm font-bold text-[#00E457] lg:text-2xl">
          <Image
            src="/main/comment.svg"
            alt="댓글 아이콘"
            width={26}
            height={24}
            className="lg:[26px] h-[17px] w-[18px] lg:h-[24px]"
          />
          상세 페이지 댓글
        </h1>
      </AnimateOnView>
      <AnimateOnView animation="reveal flex justify-center">
        <p className="my-3 w-full text-center text-2xl leading-[1.5] font-semibold lg:w-[65%] lg:w-[80%] lg:text-3xl lg:font-bold">
          동아리에 대한 의견이나, 궁금한 점을
          <br className="lg:hidden" /> 댓글로 남기고{' '}
          <span className="text-[#00E457]">소통할 수 있어요.</span>
        </p>
      </AnimateOnView>
    </div>
  );
}

export default CommentTextCard;
