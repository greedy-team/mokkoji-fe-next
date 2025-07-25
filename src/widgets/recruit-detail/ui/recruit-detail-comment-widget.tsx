import RecruitDetailCommentInput from '@/features/recruit-detail/ui/recruit-detail-comment-input';
import { getClubDetailComments } from '../api/getClubDetailComments';

interface CommentWidgetProps {
  clubId: number;
}

const comment = [
  {
    id: 1,
    content:
      '동아리 너무 재미있어보여요. 이거 배우면 저도 주짓수 King..이 될 수 있나요?',
    rate: 4.5,
    isModified: false,
    time: '2025-07-24T14:32:00',
    isWriter: false,
  },
  {
    id: 2,
    content: '동아리 논란 해명하세요.',
    rate: 2.0,
    isModified: true,
    time: '2025-07-25T10:12:00',
    isWriter: false,
  },
  {
    id: 3,
    content: '생각보다 체계적이고 팀 분위기도 좋아 보여요.',
    rate: 5.0,
    isModified: false,
    time: '2025-07-23T09:00:00',
    isWriter: true,
  },
];

async function RecruitDetailCommentWidget({ clubId }: CommentWidgetProps) {
  // const { comments } = await getClubDetailComments(clubId);

  return (
    <section className="mt-13">
      <p className="text-base font-semibold">댓글 {comment.length}</p>
      <RecruitDetailCommentInput />
    </section>
  );
}

export default RecruitDetailCommentWidget;
