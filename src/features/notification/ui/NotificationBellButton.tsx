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
      className="hover:bg-gray3 relative flex cursor-pointer items-center rounded-full px-3 py-1.5 transition-all"
    >
      {/* 프로필 아이콘이 채워진 도형이라, 선 아이콘인 종은 굵기와 색을 올려야 무게가 맞는다 */}
      <Bell
        size={24}
        strokeWidth={2.2}
        className={cn(
          'transition-colors',
          isOpen ? 'text-primary-500' : 'text-text-primary',
        )}
      />
      {hasUnread && (
        <span className="bg-alert-500 absolute top-0.5 right-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full border border-white px-[3px] text-[10px] leading-none font-bold text-white">
          {unreadCount > MAX_BADGE_COUNT ? `${MAX_BADGE_COUNT}+` : unreadCount}
        </span>
      )}
    </button>
  );
}

export default NotificationBellButton;
