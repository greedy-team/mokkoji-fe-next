'use client';

import useNotificationStream from '@/entities/notification/lib/useNotificationStream';

/**
 * SSE 연결을 여는 지점. 화면에 아무것도 그리지 않는다.
 *
 * QueryProvider와 AppSessionProvider 안쪽이어야 하고, 한 번만 마운트해야 한다.
 * 두 군데서 마운트하면 EventSource가 두 개 열린다.
 */
function NotificationStreamMount() {
  useNotificationStream();
  return null;
}

export default NotificationStreamMount;
