import { queryOptions } from '@tanstack/react-query';
import getClientNotificationList from './getClientNotificationList';
import getClientUnreadCount from './getClientUnreadCount';

export const notificationBaseKey = ['notifications'] as const;

export const NOTIFICATION_PAGE_SIZE = 20;

export function getNotificationListOptions(params: {
  page: number;
  size: number;
}) {
  return queryOptions({
    queryKey: [...notificationBaseKey, 'list', params.page, params.size],
    queryFn: () => getClientNotificationList(params),
    // SSE push를 신호로 받아 재조회하므로 캐시를 오래 들고 있을 이유가 없다
    staleTime: 0,
  });
}

export function getUnreadCountOptions(enabled: boolean) {
  return queryOptions({
    queryKey: [...notificationBaseKey, 'unread-count'],
    queryFn: () => getClientUnreadCount(),
    staleTime: 0,
    enabled,
  });
}
