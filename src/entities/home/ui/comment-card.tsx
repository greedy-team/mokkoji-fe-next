import AnimateOnView from '@/features/home/util/animate-viewport';

function CommentCard() {
  return (
    <div className="relative h-[275px] w-full">
      <AnimateOnView animation="reveal-0">
        <div className="absolute top-[15%] left-[5%]">
          <img src="/main/불면증염소.svg" alt="댓글 이미지 1" />
        </div>
      </AnimateOnView>
      <AnimateOnView animation="reveal-1">
        <div className="absolute top-[35%] left-[25%] z-10">
          <img src="/main/격투기선수.svg" alt="댓글 이미지 2" />
        </div>
      </AnimateOnView>
      <AnimateOnView animation="reveal-2">
        <div className="absolute top-[5%] left-[45%] z-20">
          <img src="/main/졸린사자.svg" alt="댓글 이미지 2" />
        </div>
      </AnimateOnView>
    </div>
  );
}

export default CommentCard;
