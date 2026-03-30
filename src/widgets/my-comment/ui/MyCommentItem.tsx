import Link from 'next/link';
import formatDate from '@/shared/lib/formatDate';
import { MyComment } from '../model/type';

interface MyCommentItemProps {
  comment: MyComment;
}

function MyCommentItem({ comment }: MyCommentItemProps) {
  return (
    <Link
      href={`/club/${comment.clubId}?tab=comments#comment-${comment.commentId}`}
      className="flex cursor-pointer flex-col gap-2 rounded-lg p-3 transition-colors hover:bg-gray-200"
    >
      <span className="text-text-secondary text-base font-bold">
        {comment.name}
      </span>
      <span className="text-text-secondary line-clamp-2 text-sm leading-[150%] font-normal">
        {comment.description}
      </span>
      <span className="text-xs font-normal text-[#8B95A1]">
        {formatDate(comment.createdAt)}
      </span>
    </Link>
  );
}

export default MyCommentItem;
