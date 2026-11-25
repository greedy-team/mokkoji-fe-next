import { Pagination, UserRole } from '@/shared/model/type';

export const NOTIFICATION_TYPES = [
  'CLUB_APPLICATION_APPROVED',
  'CLUB_APPLICATION_REJECTED',
  'CLUB_MASTER_APPROVED',
  'CLUB_MASTER_REJECTED',
  'CLUB_MASTER_TRANSFERRED',
  'CLUB_MASTER_RESIGNED',
  'CLUB_DELETED',
] as const;

export type NotificationType = (typeof NOTIFICATION_TYPES)[number];

export interface NotificationItem {
  id: number;
  type: NotificationType;
  title: string;
  content: string;
  targetId: number | null;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationsResponse {
  notifications: NotificationItem[];
  pagination: Pagination;
}

export interface UnreadCountResponse {
  unreadCount: number;
}

export const SSE_EVENTS = {
  CONNECT: 'connect',
  NOTIFICATION: 'notification',
  ROLE_CHANGED: 'role-changed',
} as const;

/**
 * 연결 직후 받는 페이로드. role은 일반 사용자만 실리고,
 * 관리자 토큰은 백엔드가 UserRepository에서 조회할 수 없어 null로 내려온다.
 */
export interface ConnectPayload {
  message: string;
  role: UserRole | null;
}

/** SSE push 페이로드. REST 목록과 달리 id·isRead·createdAt이 없다. */
export interface NotificationPushPayload {
  type: NotificationType;
  title: string;
  content: string;
  targetId: number | null;
}
