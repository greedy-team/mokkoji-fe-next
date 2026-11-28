import { NotificationItem } from '../model/type';

/**
 * 알림을 눌렀을 때 이동할 경로. 이동할 수 없으면 null.
 *
 * CLUB_DELETED는 동아리가 사라져 백엔드가 targetId를 null로 내려준다.
 * 다른 타입도 null이 올 수 있다고 보고 targetId 유무로만 판단한다.
 */
function getNotificationHref(
  notification: Pick<NotificationItem, 'type' | 'targetId'>,
  universityCode: string,
): string | null {
  if (notification.type === 'CLUB_DELETED') return null;
  if (notification.targetId === null) return null;

  return `/${universityCode}/club/${notification.targetId}`;
}

export default getNotificationHref;
