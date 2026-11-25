'use client';

import { BellOff } from 'lucide-react';
import cn from '@/shared/lib/utils';
import getNotificationHref from '@/entities/notification/lib/getNotificationHref';
import NotificationItemRow from '@/entities/notification/ui/NotificationItemRow';
import type { NotificationItem } from '@/entities/notification/model/type';

interface NotificationPanelProps {
  notifications: NotificationItem[];
  unreadCount: number;
  universityCode: string;
  isPending: boolean;
  onRead: (notificationId: number) => void;
  onReadAll: () => void;
  className?: string;
}

function NotificationPanel({
  notifications,
  unreadCount,
  universityCode,
  isPending,
  onRead,
  onReadAll,
  className,
}: NotificationPanelProps) {
  return (
    <div
      className={cn(
        'border-gray2 overflow-hidden rounded-xl border bg-white shadow-lg',
        className,
      )}
    >
      <div className="border-gray4 flex h-12 items-center border-b px-4">
        <span className="text-sm font-bold">알림</span>
        {unreadCount > 0 && (
          <>
            <span className="bg-primary-500 text-text-primary ml-1.5 rounded-full px-1.5 py-px text-xs font-bold">
              {unreadCount}
            </span>
            <button
              type="button"
              onClick={onReadAll}
              className="text-primary-500 ml-auto text-xs font-semibold hover:underline"
            >
              모두 읽음
            </button>
          </>
        )}
      </div>

      <div className="max-h-[22rem] overflow-y-auto">
        {isPending && (
          <p className="text-text-tertiary py-11 text-center text-xs">
            불러오는 중…
          </p>
        )}

        {!isPending && notifications.length === 0 && (
          <div className="py-11 text-center">
            <BellOff size={32} className="text-gray2 mx-auto" />
            <p className="text-text-tertiary mt-2.5 text-xs">
              새로운 알림이 없습니다
            </p>
          </div>
        )}

        {notifications.map((notification) => (
          <NotificationItemRow
            key={notification.id}
            notification={notification}
            href={getNotificationHref(notification, universityCode)}
            onRead={onRead}
          />
        ))}
      </div>
    </div>
  );
}

export default NotificationPanel;
