import RecruitDetailComment from '@/entities/recruit-detail/ui/recruit-detail-comment';
import RecruitDetailCommentInput from '@/features/recruit-detail/ui/recruit-detail-comment-input';
import { auth } from '@/auth';
import getClubDetailComments from '../api/getClubDetailComments';
import { CommentType } from '../model/type';

interface CommentWidgetProps {
  clubId: number;
}

const comments = [
  {
    id: 1,
    content:
      '동아리 너무 재미있어보여요. 이거 배우면 저도 주짓수 King..이 될 수 있나요?',
    rate: 4.5,
    isModified: false,
    time: '2025-07-25T19:22:00',
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
    content:
      '처음엔 그냥 격투기 동아리인가 했는데, 생각보다 체계적이고 팀 분위기도 좋아 보여요. 운동 부족한 나에게 딱일 것 같은데, 시작만 하면 나도 금방 빠져들 것 같은 느낌? 솔직히 도복 입고 굴러다니는 거… 왠지 멋있고 재밌어 보여요..',
    rate: 5.0,
    isModified: false,
    time: '2025-07-23T09:00:00',
    isWriter: true,
  },
];

async function RecruitDetailCommentWidget({ clubId }: CommentWidgetProps) {
  const session = await auth();
  let commentList: CommentType[] = [];
  if (session?.accessToken) {
    const data = await getClubDetailComments(clubId, session?.accessToken);
    commentList = data.data.comments;
  }
  console.log(commentList);

  return (
    <section className="mt-13">
      <p className="cursor-default text-base font-semibold">
        댓글 {commentList.length}
      </p>
      <RecruitDetailCommentInput clubId={clubId} />
      <RecruitDetailComment comments={commentList} />
    </section>
  );
}

export default RecruitDetailCommentWidget;
