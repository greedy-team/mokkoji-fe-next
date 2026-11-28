import { RecruitStatus } from '@/shared/model/type';

// navigate-recruit-form의 isDisabled와 같은 기준이다.
const CLOSED_RECRUIT_STATUSES: RecruitStatus[] = ['BEFORE', 'CLOSED'];

interface ApplyClickContext {
  recruitForm: string;
  recruitStatus: RecruitStatus;
}

const shouldCollectApplyClick = ({
  recruitForm,
  recruitStatus,
}: ApplyClickContext) => {
  if (!recruitForm.trim()) return false;

  return !CLOSED_RECRUIT_STATUSES.includes(recruitStatus);
};

export default shouldCollectApplyClick;
