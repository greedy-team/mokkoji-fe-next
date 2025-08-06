import Image from 'next/image';
import { toast } from 'react-toastify';
import timeAgo from '@/entities/recruit-detail/util/timeAgo';
import { CommentType } from '@/widgets/recruit-detail/model/type';
import StarRating from '@/entities/recruit-detail/ui/review-star';
import revalidateComments from '@/app/actions/revalidate-comments';
import { deleteComment } from '../api/postComment';

interface CommentItemProps {
  clubId: number;
  comment: CommentType;
  onEdit: (commentId: number) => void;
  accessToken?: string;
}

export default function CommentItem({
  clubId,
  comment,
  onEdit,
  accessToken,
}: CommentItemProps) {
  const handleDeleteComment = async (
    e: React.MouseEvent<HTMLButtonElement>,
    commentId: number,
  ) => {
    e.preventDefault();

    if (!accessToken) {
      toast.warn('로그인을 먼저 해주세요.');
      return;
    }

    try {
      await deleteComment(commentId, accessToken);
      toast.success('댓글이 삭제되었습니다.');
      revalidateComments(clubId);
    } catch (err) {
      console.error(err);
      toast.error('댓글 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <span className="text-xs text-[#A4A4A4]">{timeAgo(comment.time)}</span>
        <StarRating rate={comment.rate} />
        {comment.isWriter && (
          <div className="flex h-5 w-fit items-center justify-center rounded-sm border border-[#D6D6D6] p-1">
            <button
              className="cursor-pointer px-1"
              onClick={() => {
                onEdit(comment.id);
              }}
            >
              <Image
                src="/detail/comment/correction.svg"
                alt="수정 이미지"
                width={10}
                height={10}
              />
            </button>
            <span className="mx-1 h-full border-l" />
            <button
              className="cursor-pointer px-1 text-[12px]"
              onClick={(e) => handleDeleteComment(e, comment.id)}
            >
              X
            </button>
          </div>
        )}
      </div>
      <p className="text-sm font-medium">{comment.content}</p>
    </div>
  );
}
