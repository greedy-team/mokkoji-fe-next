'use client';

import { useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useUniversityCode from '@/shared/hooks/useUniversityCode';
import useClickOutside from '@/shared/model/useClickOutside';
import { useSession } from '@/shared/lib/session-context';
import {
  NOTIFICATION_PAGE_SIZE,
  getNotificationListOptions,
  getUnreadCountOptions,
  notificationBaseKey,
} from '@/entities/notification/api/queries';
import patchAllNotificationsRead from '@/entities/notification/api/patchAllNotificationsRead';
import patchNotificationRead from '@/entities/notification/api/patchNotificationRead';
import NotificationBellButton from '@/features/notification/ui/NotificationBellButton';
import NotificationPanel from '@/features/notification/ui/NotificationPanel';

/**
 * 헤더의 알림 종. 전역 헤더에 있어 특정 페이지의 view가 prefetch할 수 없으므로
 * 이 컨테이너가 직접 조회한다. 패널을 열 때만 목록을 가져온다.
 */
function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const universityCode = useUniversityCode();
  const queryClient = useQueryClient();
  const { status } = useSession();

  useClickOutside(containerRef, () => setIsOpen(false));

  const isAuthenticated = status === 'authenticated';

  const { data: unreadCount = 0 } = useQuery(
    getUnreadCountOptions(isAuthenticated),
  );

  const { data, isPending } = useQuery({
    ...getNotificationListOptions({ page: 1, size: NOTIFICATION_PAGE_SIZE }),
    enabled: isAuthenticated && isOpen,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: notificationBaseKey });

  const handleRead = async (notificationId: number) => {
    await patchNotificationRead(notificationId);
    invalidate();
  };

  const handleReadAll = async () => {
    await patchAllNotificationsRead();
    invalidate();
  };

  if (!isAuthenticated) return null;

  return (
    <div className="relative" ref={containerRef}>
      <NotificationBellButton
        unreadCount={unreadCount}
        isOpen={isOpen}
        onToggle={() => setIsOpen((previous) => !previous)}
      />
      {isOpen && (
        <NotificationPanel
          notifications={data?.notifications ?? []}
          unreadCount={unreadCount}
          universityCode={universityCode}
          isPending={isPending}
          onRead={handleRead}
          onReadAll={handleReadAll}
          className="absolute top-11 right-0 z-50 w-[22.75rem] max-sm:fixed max-sm:top-[3.75rem] max-sm:right-0 max-sm:left-0 max-sm:w-auto max-sm:rounded-none max-sm:border-x-0"
        />
      )}
    </div>
  );
}

export default NotificationBell;
