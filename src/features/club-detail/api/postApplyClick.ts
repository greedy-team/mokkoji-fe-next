import clientApi from '@/shared/api/client-api';

type SendApplyClick = (path: string) => Promise<unknown>;

const sendByClientApi: SendApplyClick = (path) => clientApi.post(path);

// 집계 누락보다 지원 폼으로 못 나가는 쪽이 나쁘므로 실패를 전파하지 않는다.
const postApplyClick = async (
  recruitmentId: number | undefined,
  send: SendApplyClick = sendByClientApi,
) => {
  if (!recruitmentId) return false;

  try {
    await send(`api/recruitments/${recruitmentId}/apply-click`);
    return true;
  } catch {
    return false;
  }
};

export default postApplyClick;
