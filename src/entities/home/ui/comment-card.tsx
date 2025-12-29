import AnimateOnView from '@/features/home/util/animate-viewport';
import Image from 'next/image';

function CommentCard() {
  return (
    <div className="relative h-[275px] w-full">
      <AnimateOnView animation="reveal-0">
        <div className="absolute top-[10%] lg:top-[5%] lg:left-[20%]">
          <Image
            src="/main/불면증염소.png"
            alt="댓글 이미지 1"
            width={230}
            height={230}
            className="w-[40%] lg:w-[300px]"
          />
        </div>
      </AnimateOnView>
      <AnimateOnView animation="reveal-1">
        <div className="absolute top-[20%] left-[15%] z-10 lg:top-[30%] lg:left-[35%]">
          <Image
            src="/main/격투기선수.png"
            alt="댓글 이미지 2"
            width={300}
            height={300}
            className="w-[70%] lg:w-[450px]"
          />
        </div>
      </AnimateOnView>
      <AnimateOnView animation="reveal-2">
        <div className="absolute top-[7%] left-[38%] z-20 lg:left-[55%]">
          <Image
            src="/main/졸린사자.png"
            alt="댓글 이미지 2"
            width={300}
            height={300}
            className="w-[110%] lg:w-[500px]"
          />
        </div>
      </AnimateOnView>
    </div>
  );
}

export default CommentCard;
