'use client';

import { Bell } from 'lucide-react';
import cn from '@/shared/lib/utils';

const MAX_BADGE_COUNT = 99;

interface NotificationBellButtonProps {
  unreadCount: number;
  isOpen: boolean;
  onToggle: () => void;
}

function NotificationBellButton({
  unreadCount,
  isOpen,
  onToggle,
}: NotificationBellButtonProps) {
  const hasUnread = unreadCount > 0;
  const label = hasUnread ? `알림 ${unreadCount}개` : '알림';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      aria-expanded={isOpen}
      className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-[#e6e6e6]"
    >
      <Bell
        size={20}
        className={cn(
          'transition-colors',
          isOpen ? 'text-primary-500' : 'text-text-secondary',
        )}
      />
      {hasUnread && (
        <span className="bg-alert-500 absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full border-[1.5px] border-white px-1 text-[10px] font-bold text-white">
          {unreadCount > MAX_BADGE_COUNT ? `${MAX_BADGE_COUNT}+` : unreadCount}
        </span>
      )}
    </button>
  );
}

export default NotificationBellButton;
