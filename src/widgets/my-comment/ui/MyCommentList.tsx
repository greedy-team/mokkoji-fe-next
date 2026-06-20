import { MyComment } from '../model/type';
import MyCommentItem from './MyCommentItem';

interface MyCommentListProps {
  comments: MyComment[];
}

function MyCommentList({ comments }: MyCommentListProps) {
  if (comments.length === 0) {
    return (
      <p className="text-text-tertiary py-10 text-center text-sm">
        아직 작성한 댓글이 없습니다
      </p>
    );
  }

  return (
    <ul className="flex flex-col">
      {comments.map((comment, index) => (
        <li key={comment.commentId}>
          <MyCommentItem comment={comment} />
          {index < comments.length - 1 && (
            <hr className="border-disabled my-1" />
          )}
        </li>
      ))}
    </ul>
  );
}

export default MyCommentList;
