import Link from 'next/link';
import { Bell, CircleX, ShieldCheck, Trash2, Repeat } from 'lucide-react';
import cn from '@/shared/lib/utils';
import formatNotificationTime from '../lib/formatNotificationTime';
import type { NotificationItem, NotificationType } from '../model/type';

const ICONS: Record<NotificationType, typeof Bell> = {
  CLUB_APPLICATION_APPROVED: ShieldCheck,
  CLUB_APPLICATION_REJECTED: CircleX,
  CLUB_MASTER_APPROVED: ShieldCheck,
  CLUB_MASTER_REJECTED: CircleX,
  CLUB_MASTER_TRANSFERRED: Repeat,
  CLUB_MASTER_RESIGNED: Repeat,
  CLUB_DELETED: Trash2,
};

const REJECTED_TYPES: NotificationType[] = [
  'CLUB_APPLICATION_REJECTED',
  'CLUB_MASTER_REJECTED',
];

interface NotificationItemRowProps {
  notification: NotificationItem;
  href: string | null;
  onRead: (id: number) => void;
}

function NotificationItemRow({
  notification,
  href,
  onRead,
}: NotificationItemRowProps) {
  const { id, type, title, content, isRead, createdAt } = notification;
  const Icon = ICONS[type];
  const isRejected = REJECTED_TYPES.includes(type);
  const isDead = href === null;

  const body = (
    <>
      <span
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
          isRejected && 'bg-alert-500/12',
          !isRejected && !isDead && 'bg-primary-500/16',
          isDead && 'bg-gray4',
        )}
      >
        <Icon
          size={17}
          className={cn(
            isRejected && 'text-alert-500',
            !isRejected && !isDead && 'text-primary-500',
            isDead && 'text-gray',
          )}
        />
      </span>
      <span className="min-w-0 flex-1">
        <span className="text-text-primary block text-sm font-semibold">
          {title}
        </span>
        <span className="text-text-secondary mt-0.5 line-clamp-2 block text-xs">
          {content}
        </span>
        <span className="text-text-tertiary mt-1 block text-xs">
          {formatNotificationTime(createdAt)}
          {isDead && ' · 이동할 수 없음'}
        </span>
      </span>
      {!isRead && (
        <span className="bg-primary-500 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
      )}
    </>
  );

  const shared = cn(
    'flex w-full gap-2.5 border-b border-gray4 px-4 py-3 text-left last:border-b-0',
    !isRead && 'bg-primary-500/7',
    isDead && 'opacity-55',
  );

  if (isDead) {
    return <div className={shared}>{body}</div>;
  }

  return (
    <Link
      href={href}
      onClick={() => !isRead && onRead(id)}
      className={cn(shared, 'hover:bg-gray4 transition-colors')}
    >
      {body}
    </Link>
  );
}

export default NotificationItemRow;
