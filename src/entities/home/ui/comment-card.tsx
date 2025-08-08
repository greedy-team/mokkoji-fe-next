import AnimateOnView from '@/features/home/util/animate-viewport';
import Image from 'next/image';

function CommentCard() {
  return (
    <div className="relative h-[275px] w-full">
      <AnimateOnView animation="reveal-0">
        <div className="absolute top-[15%] left-[5%]">
          <Image
            src="/main/불면증염소.svg"
            alt="댓글 이미지 1"
            width={230}
            height={230}
            className="lg:h-[400px] lg:w-[400px]"
          />
        </div>
      </AnimateOnView>
      <AnimateOnView animation="reveal-1">
        <div className="absolute top-[45%] left-[15%] z-10 lg:top-[35%] lg:left-[25%]">
          <Image
            src="/main/격투기선수.svg"
            alt="댓글 이미지 2"
            width={300}
            height={300}
            className="lg:h-[400px] lg:w-[400px]"
          />
        </div>
      </AnimateOnView>
      <AnimateOnView animation="reveal-2">
        <div className="absolute top-[5%] left-[30%] z-20 lg:left-[45%]">
          <Image
            src="/main/졸린사자.svg"
            alt="댓글 이미지 2"
            width={300}
            height={300}
            className="lg:h-[400px] lg:w-[400px]"
          />
        </div>
      </AnimateOnView>
    </div>
  );
}

export default CommentCard;
