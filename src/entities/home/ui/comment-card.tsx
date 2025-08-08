import AnimateOnView from '@/features/home/util/animate-viewport';

function CommentCard() {
  return (
    <div className="relative h-[300px] w-full sm:h-[350px] lg:h-[275px]">
      <AnimateOnView animation="reveal-0">
        <div className="absolute top-[15%] left-[5%]">
          <img
            src="/main/불면증염소.svg"
            alt="댓글 이미지 1"
            className="h-[90%] w-[90%] lg:h-auto lg:w-auto"
          />
        </div>
      </AnimateOnView>
      <AnimateOnView animation="reveal-1">
        <div className="absolute top-[35%] left-[25%] z-10">
          <img src="/main/격투기선수.svg" alt="댓글 이미지 2" />
        </div>
      </AnimateOnView>
      <AnimateOnView animation="reveal-2">
        <div className="absolute top-[5%] left-[35%] z-20 lg:top-[5%] lg:left-[45%]">
          <img
            src="/main/졸린사자.svg"
            alt="댓글 이미지 3"
            className="h-[160%] w-[140%] lg:h-auto lg:w-auto"
          />
        </div>
      </AnimateOnView>
    </div>
  );
}

export default CommentCard;
