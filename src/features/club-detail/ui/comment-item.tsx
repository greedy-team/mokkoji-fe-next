import Image from 'next/image';
import { toast } from 'react-toastify';
import timeAgo from '@/entities/recruit-detail/util/timeAgo';
import { CommentType } from '@/widgets/recruit-detail/model/type';
import StarRating from '@/entities/recruit-detail/ui/review-star';
import { deleteComment } from '../api/postComment';

interface CommentItemProps {
  clubId: number;
  comment: CommentType;
  onEdit: (commentId: number) => void;
}

export default function CommentItem({
  clubId,
  comment,
  onEdit,
}: CommentItemProps) {
  const handleDeleteComment = async (
    e: React.MouseEvent<HTMLButtonElement>,
    commentId: number,
  ) => {
    e.preventDefault();
    const confirmDelete = window.confirm('댓글을 삭제하시겠습니까?');
    if (!confirmDelete) return;

    const response = await deleteComment(clubId, commentId);
    if (!response.ok) {
      toast.error(response.message);
      return;
    }
    toast.success(response.message);
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
