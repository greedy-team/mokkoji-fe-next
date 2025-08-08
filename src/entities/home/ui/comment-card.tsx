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
            width={400}
            height={400}
          />
        </div>
      </AnimateOnView>
      <AnimateOnView animation="reveal-1">
        <div className="absolute top-[35%] left-[25%] z-10">
          <Image
            src="/main/격투기선수.svg"
            alt="댓글 이미지 2"
            width={500}
            height={500}
          />
        </div>
      </AnimateOnView>
      <AnimateOnView animation="reveal-2">
        <div className="absolute top-[5%] left-[45%] z-20">
          <Image
            src="/main/졸린사자.svg"
            alt="댓글 이미지 2"
            width={500}
            height={500}
          />
        </div>
      </AnimateOnView>
    </div>
  );
}

export default CommentCard;
