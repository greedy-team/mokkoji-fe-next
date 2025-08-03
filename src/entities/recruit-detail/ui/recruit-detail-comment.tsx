import { CommentType } from '@/widgets/recruit-detail/model/type';
import timeAgo from '../util/timeAgo';
import StarRating from './review-star';

interface RecruitDetailCommentProps {
  comments: CommentType[];
}

function RecruitDetailComment({ comments }: RecruitDetailCommentProps) {
  return (
    <div className="flex flex-col gap-3.5">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="flex gap-4 rounded-2xl border border-[#D6D6D6] p-5"
        >
          <div className="h-10 w-10 rounded-full bg-[rgb(244,244,244)] p-2">
            <img
              src="/detail/profileIcon.svg"
              alt="프로필 이미지"
              width={30}
              height={30}
            />
          </div>
          <div className="flex flex-1 flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#A4A4A4]">
                {timeAgo(comment.time)}
              </span>
              <StarRating rate={comment.rate} />
            </div>
            <p className="font-medium">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecruitDetailComment;
