import AnimateOnView from '@/features/home/util/animate-viewport';

function CommentTextCard() {
  return (
    <div className="flex h-[50%] w-full flex-col items-center">
      <AnimateOnView animation="animate-fade-left">
        <h4 className="mb-2 flex gap-2 text-2xl font-bold text-[#00E457]">
          <img
            src="/main/comment.svg"
            alt="댓글 아이콘"
            width={26}
            height={24}
          />
          상세 페이지 댓글
        </h4>
      </AnimateOnView>
      <AnimateOnView animation="reveal">
        <p className="my-3 text-center text-3xl font-bold">
          동아리에 대한 의견이나, 궁금한 점을 댓글로 <br />
          남기고 <span className="text-[#00E457]">소통할 수 있어요.</span>
        </p>
      </AnimateOnView>
    </div>
  );
}

export default CommentTextCard;
